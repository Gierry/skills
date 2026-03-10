import path from "node:path";
import { readFile } from "node:fs/promises";
import type { CliArgs } from "../types";

const BAOYU_MODELS = [
  "gemini-3.1-flash-image-preview",
  "gemini-3-pro-image-preview",
  "gemini-3-flash-preview",
];

export function getDefaultModel(): string {
  return process.env.BAOYU_IMAGE_MODEL || "gemini-3.1-flash-image-preview";
}

function getHelleAiApiKey(): string | null {
  return process.env.BAOYU_API_KEY || null;
}

function getHelleAiBaseUrl(): string {
  const base = process.env.BAOYU_BASE_URL || "https://api.helle.ai";
  return base.replace(/\/+$/g, "");
}

function buildHelleAiUrl(pathname: string, apiKey: string): string {
  const base = getHelleAiBaseUrl();
  const cleanedPath = pathname.replace(/^\/+/g, "");
  const url = base.endsWith("/v1beta") 
    ? `${base}/${cleanedPath}` 
    : `${base}/v1beta/${cleanedPath}`;
  return `${url}?key=${apiKey}`;
}

function toModelPath(model: string): string {
  const modelId = model.startsWith("models/") ? model.slice("models/".length) : model;
  return `models/${modelId}`;
}

function getHelleAiImageSize(args: CliArgs): "1K" | "2K" | "4K" {
  if (args.imageSize) return args.imageSize as "1K" | "2K" | "4K";
  return args.quality === "2k" ? "2K" : "1K";
}

function addAspectRatioToPrompt(prompt: string, ar: string | null): string {
  if (!ar) return prompt;
  return `${prompt} Aspect ratio: ${ar}.`;
}

async function readImageAsBase64(
  p: string,
): Promise<{ data: string; mimeType: string }> {
  const buf = await readFile(p);
  const ext = path.extname(p).toLowerCase();
  let mimeType = "image/png";
  if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
  else if (ext === ".gif") mimeType = "image/gif";
  else if (ext === ".webp") mimeType = "image/webp";
  return { data: buf.toString("base64"), mimeType };
}

async function postHelleAiJson<T>(
  pathname: string,
  body: unknown,
): Promise<T> {
  const apiKey = getHelleAiApiKey();
  if (!apiKey) throw new Error("BAOYU_API_KEY is required");

  const url = buildHelleAiUrl(pathname, apiKey);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Helle.ai API error (${res.status}): ${err}`);
  }

  const parsed = await res.json() as any;
  if (parsed.error) {
    throw new Error(
      `Helle.ai API error (${parsed.error.code}): ${parsed.error.message}`,
    );
  }

  return parsed as T;
}

function extractInlineImageData(response: {
  candidates?: Array<{
    content?: { parts?: Array<{ inlineData?: { data?: string } }> };
  }>;
}): string | null {
  for (const candidate of response.candidates || []) {
    for (const part of candidate.content?.parts || []) {
      const data = part.inlineData?.data;
      if (typeof data === "string" && data.length > 0) return data;
    }
  }
  return null;
}

export async function generateImage(
  prompt: string,
  model: string,
  args: CliArgs,
): Promise<Uint8Array> {
  const promptWithAspect = addAspectRatioToPrompt(prompt, args.aspectRatio);
  
  const parts: Array<{
    text?: string;
    inlineData?: { data: string; mimeType: string };
  }> = [];

  // 添加参考图片（如果有）
  for (const refPath of args.referenceImages) {
    const { data, mimeType } = await readImageAsBase64(refPath);
    parts.push({ inlineData: { data, mimeType } });
  }

  // 添加文本提示词
  parts.push({ text: promptWithAspect });

  const imageConfig: { imageSize: "1K" | "2K" | "4K" } = {
    imageSize: getHelleAiImageSize(args),
  };

  console.log("Generating image with Helle.ai...", imageConfig);
  
  const response = await postHelleAiJson<{
    candidates?: Array<{
      content?: { parts?: Array<{ inlineData?: { data?: string } }> };
    }>;
  }>(`${toModelPath(model)}:generateContent`, {
    contents: [
      {
        role: "user",
        parts,
      },
    ],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig,
    },
  });
  
  console.log("Generation completed.");

  const imageData = extractInlineImageData(response);
  if (imageData) return Uint8Array.from(Buffer.from(imageData, "base64"));

  throw new Error("No image in response");
}
