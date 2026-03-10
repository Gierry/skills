# HelleAI Skills Collection

一套完整的 AI 技能包集合，涵盖内容创作、图片生成、社交媒体发布、格式转换等多个领域。

## 技能速查表

| 技能名称 | 用途 | 主要功能 |
|---------|------|---------|
| **内容创作** | | |
| baoyu-format-markdown | 格式化文章 | 美化 Markdown，添加元数据 |
| baoyu-translate | 翻译文档 | 支持快速/标准/精细三种模式 |
| **图片生成** | | |
| baoyu-image-gen | AI 图片生成 | 支持 5 个供应商，多种尺寸 |
| baoyu-cover-image | 封面图生成 | 5 维度定制，9 色板 × 6 风格 |
| baoyu-article-illustrator | 文章配图 | 自动分析并生成配图 |
| baoyu-infographic | 信息图生成 | 21 布局 × 20 风格 |
| baoyu-slide-deck | 幻灯片生成 | 16 种专业风格，可导出 PDF/PPTX |
| baoyu-comic | 漫画生成 | 知识漫画，5 种艺术风格 |
| baoyu-xhs-images | 小红书图片 | 1-10 张系列图，10 种风格 |
| baoyu-compress-image | 图片压缩 | WebP/PNG 压缩优化 |
| **社交媒体** | | |
| baoyu-post-to-wechat | 微信公众号发布 | API/浏览器模式，文章+图文 |
| baoyu-post-to-x | X (Twitter) 发布 | 推文、视频、长文章 |
| baoyu-post-to-weibo | 微博发布 | 微博、视频、头条文章 |
| **内容转换** | | |
| baoyu-markdown-to-html | Markdown 转 HTML | 4 种主题，支持代码高亮/公式 |
| baoyu-url-to-markdown | 网页转 Markdown | 抓取网页并转换 |
| baoyu-danger-x-to-markdown | 推文转 Markdown | 保存 X 推文和文章 |
| **微信公众号工作流** | | |
| helleAI-wechat-article-complete | 一站式生成 | 文案→配图→HTML 完整流程 |
| helleAI-wechat-step1-text-to-md | 步骤1: 文案转写 | 生成爆款标题和 Markdown |
| helleAI-wechat-step2-md-analyze-images | 步骤2: 配图生成 | 分析、生成、压缩、上传图片 |
| helleAI-wechat-step3-md-to-html-by-images | 步骤3: HTML 整合 | 整合图片 URL，生成最终 HTML |
| **文档处理** | | |
| claude-skill-docx | Word 文档 | 创建、编辑、跟踪更改 |
| claude-skill-xlsx | Excel 表格 | 公式、格式化、数据分析 |
| claude-skill-pptx | PowerPoint | 创建、编辑演示文稿 |
| claude-skill-pdf | PDF 处理 | 提取、创建、合并、表单 |
| **其他工具** | | |
| baoyu-danger-gemini-web | Gemini Web API | 文本/图片生成（逆向工程） |
| claude-skill-skill-creator | 技能创建指南 | 创建新技能的指导 |

## 目录

- [快速开始](#快速开始)
- [环境要求](#环境要求)
- [技能分类](#技能分类)
  - [内容创作与格式化](#内容创作与格式化)
  - [图片生成](#图片生成)
  - [社交媒体发布](#社交媒体发布)
  - [内容转换](#内容转换)
  - [微信公众号工作流](#微信公众号工作流)
  - [文档处理](#文档处理)
- [全局配置](#全局配置)
- [常见问题](#常见问题)

---

## 快速开始

### 安装 Bun 运行时

所有技能都需要 Bun 运行时。选择以下任一方式安装：

**方式 1: 使用 Homebrew (推荐 macOS)**
```bash
brew install bun
```

**方式 2: 使用 npm**
```bash
npm install -g bun
```

**方式 3: 使用官方脚本**
```bash
curl -fsSL https://bun.sh/install | bash
```

验证安装：
```bash
bun --version
```

### 配置文件位置

技能配置文件支持两个级别：

| 级别 | 路径 | 优先级 | 说明 |
|------|------|--------|------|
| 项目级 | `.helleAI-skills/.env` | 高 | 仅当前项目 |
| 用户级 | `~/.helleAI-skills/.env` | 低 | 所有项目共享 |

---

## 环境要求

- **Bun**: >= 1.0.0
- **Node.js**: >= 18.0.0 (可选，某些脚本需要)
- **Chrome**: 最新版本 (浏览器自动化技能需要)
- **操作系统**: macOS, Linux, Windows (WSL)

---

## 技能分类

### 内容创作与格式化

#### 1. baoyu-format-markdown

**功能**: 格式化纯文本或 Markdown 文件，添加 frontmatter、标题、摘要等。

**使用场景**:
- 美化文章排版
- 添加元数据
- 规范化 Markdown 格式

**配置**: 无需配置

**使用方法**:
```bash
bun baoyu-format-markdown/scripts/main.ts article.md
bun baoyu-format-markdown/scripts/main.ts article.md --quotes  # 启用引号替换
```

**输出**: `{filename}-formatted.md`

---

#### 2. baoyu-translate

**功能**: 文章和文档翻译，支持三种模式。

**翻译模式**:
- **quick**: 快速直译
- **normal**: 分析后翻译
- **refined**: 分析、翻译、审校、润色

**配置**:

创建 `EXTEND.md` 文件：
```yaml
---
default_mode: refined
default_source_lang: en
default_target_lang: zh
glossaries:
  - path: glossaries/tech-terms.md
---
```

**使用方法**:
```bash
# 快速翻译
bun baoyu-translate/scripts/chunk.ts article.md --max-words 5000

# 精细翻译（推荐）
# 通过 AI 调用，自动执行完整流程
```

**支持的术语表**: 可在 `references/glossary-en-zh.md` 中自定义

---

### 图片生成

#### 3. baoyu-image-gen

**功能**: AI 图片生成，支持多个供应商。

**支持的供应商**:
- Helle.ai (推荐)
- Google Gemini
- OpenAI
- DashScope (阿里通义万象)
- Replicate

**配置**:

在 `.helleAI-skills/.env` 中添加：
```bash
# 选择一个或多个供应商
HELLEAI_API_KEY=your_key_here
GOOGLE_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
DASHSCOPE_API_KEY=your_key_here
REPLICATE_API_TOKEN=your_token_here
```

**EXTEND.md 配置** (可选):
```yaml
---
default_provider: helleai
default_quality: 2k
default_aspect_ratio: "16:9"
default_model:
  helleai: "gemini-3.1-flash-image-preview"
  google: "gemini-3-pro-image-preview"
---
```

**使用方法**:
```bash
# 基础生成
bun baoyu-image-gen/scripts/main.ts --prompt "A cat" --image cat.png

# 指定宽高比
bun baoyu-image-gen/scripts/main.ts --prompt "A landscape" --image out.png --ar 16:9

# 使用参考图片
bun baoyu-image-gen/scripts/main.ts --prompt "Make it blue" --image out.png --ref source.png

# 指定供应商
bun baoyu-image-gen/scripts/main.ts --prompt "A cat" --image out.png --provider google
```

---

#### 4. baoyu-cover-image

**功能**: 生成文章封面图片，5 维度定制。

**5 个维度**:
- Type (类型)
- Palette (色板): 9 种
- Rendering (渲染风格): 6 种
- Text (文字密度)
- Mood (情绪强度)

**配置**: 依赖 `baoyu-image-gen`，使用相同的 API 配置

**使用方法**:
```bash
# 自动选择维度
bun baoyu-cover-image/scripts/main.ts article.md

# 快速模式（跳过确认）
bun baoyu-cover-image/scripts/main.ts article.md --quick

# 指定维度
bun baoyu-cover-image/scripts/main.ts article.md --palette warm --rendering flat-vector
```

**输出**: `cover-image/{topic-slug}/cover.png`

---

#### 5. baoyu-article-illustrator

**功能**: 为文章生成配图，Type × Style 二维方法。

**支持的风格**:
- Blueprint (蓝图)
- Chalkboard (黑板)
- Editorial (编辑风格)
- Elegant (优雅)
- Flat (扁平)
- Minimal (极简)
- 等 21 种风格

**配置**: 依赖 `baoyu-image-gen`

**使用方法**:
```bash
# 通过 AI 调用，自动分析文章并生成配图
```

---

#### 6. baoyu-infographic

**功能**: 生成专业信息图，21 种布局 × 20 种视觉风格。

**布局类型**:
- Linear Progression (线性进程)
- Hub-Spoke (中心辐射)
- Funnel (漏斗)
- Comparison Matrix (对比矩阵)
- 等 21 种

**视觉风格**:
- Bold Graphic (粗体图形)
- Corporate Memphis (企业孟菲斯)
- Cyberpunk Neon (赛博朋克霓虹)
- 等 20 种

**配置**: 依赖 `baoyu-image-gen`

**使用方法**:
```bash
# 通过 AI 调用，自动推荐布局和风格
```

---

#### 7. baoyu-slide-deck

**功能**: 生成专业幻灯片图片。

**支持的风格**:
- Blueprint
- Bold Editorial
- Corporate
- Minimal
- Scientific
- 等 16 种

**配置**: 依赖 `baoyu-image-gen`

**使用方法**:
```bash
# 生成幻灯片
# 通过 AI 调用

# 合并为 PDF
bun baoyu-slide-deck/scripts/merge-to-pdf.ts <slide-deck-dir>

# 合并为 PPTX
bun baoyu-slide-deck/scripts/merge-to-pptx.ts <slide-deck-dir>
```

---

#### 8. baoyu-comic

**功能**: 创建知识漫画，支持多种艺术风格。

**艺术风格**:
- Manga (漫画)
- Ligne Claire (清线)
- Realistic (写实)
- Ink Brush (水墨)
- Chalk (粉笔)

**配置**: 依赖 `baoyu-image-gen`

**使用方法**:
```bash
# 通过 AI 调用，自动生成分镜和图片

# 合并为 PDF
bun baoyu-comic/scripts/merge-to-pdf.ts <comic-dir>
```

---

#### 9. baoyu-xhs-images

**功能**: 生成小红书信息图系列，1-10 张卡通风格图片。

**视觉风格**:
- Bold (大胆)
- Cute (可爱)
- Fresh (清新)
- Minimal (极简)
- Notion (Notion 风格)
- 等 10 种

**配置**: 依赖 `baoyu-image-gen`

**使用方法**:
```bash
# 通过 AI 调用，自动生成系列图片
```

---

#### 10. baoyu-compress-image

**功能**: 图片压缩，支持 WebP 和 PNG 格式。

**配置**: 无需配置

**使用方法**:
```bash
# 单个文件压缩为 WebP
bun baoyu-compress-image/scripts/main.ts image.png

# 保持 PNG 格式
bun baoyu-compress-image/scripts/main.ts image.png -f png --keep

# 递归压缩目录
bun baoyu-compress-image/scripts/main.ts ./images/ -r -q 75

# JSON 输出
bun baoyu-compress-image/scripts/main.ts image.png --json
```

---

### 社交媒体发布

#### 11. baoyu-post-to-wechat

**功能**: 发布内容到微信公众号，支持 API 和浏览器两种模式。

**发布类型**:
- 文章 (Article): 支持 Markdown、HTML、纯文本
- 图文 (Image-Text): 最多 9 张图片

**配置**:

**API 模式** (推荐):
```bash
# .helleAI-skills/.env
WECHAT_APP_ID=your_app_id
WECHAT_APP_SECRET=your_app_secret
```

获取方式：
1. 访问 https://mp.weixin.qq.com
2. 进入：开发 → 基本配置
3. 复制 AppID 和 AppSecret

**EXTEND.md 配置** (可选):
```yaml
---
default_theme: default
default_color: blue
default_publish_method: api
default_author: helleAI
need_open_comment: 1
only_fans_can_comment: 0
---
```

**使用方法**:
```bash
# API 模式发布文章
bun baoyu-post-to-wechat/scripts/wechat-api.ts article.md --theme default

# 浏览器模式发布文章
bun baoyu-post-to-wechat/scripts/wechat-article.ts --markdown article.md --theme grace

# 图文发布
bun baoyu-post-to-wechat/scripts/wechat-browser.ts --markdown article.md --images ./images/
```

---

#### 12. baoyu-post-to-x

**功能**: 发布内容到 X (Twitter)，支持常规推文和长文章。

**发布类型**:
- 常规推文: 文字 + 图片/视频
- X Articles: 长文 Markdown

**配置**: 需要 Chrome 浏览器，首次运行需登录

**使用方法**:
```bash
# 发布推文
bun baoyu-post-to-x/scripts/x-browser.ts "Hello!" --image ./photo.png

# 发布视频
bun baoyu-post-to-x/scripts/x-video.ts "Check this out!" --video ./clip.mp4

# 发布文章
bun baoyu-post-to-x/scripts/x-article.ts article.md
bun baoyu-post-to-x/scripts/x-article.ts article.md --cover ./cover.jpg

# 引用推文
bun baoyu-post-to-x/scripts/x-quote.ts https://x.com/user/status/123 "Great insight!"
```

---

#### 13. baoyu-post-to-weibo

**功能**: 发布内容到微博，支持常规微博和头条文章。

**发布类型**:
- 常规微博: 文字 + 图片/视频
- 头条文章: Markdown 长文

**配置**: 需要 Chrome 浏览器，首次运行需登录

**使用方法**:
```bash
# 发布微博
bun baoyu-post-to-weibo/scripts/weibo-post.ts "Hello Weibo!" --image ./photo.png

# 发布视频
bun baoyu-post-to-weibo/scripts/weibo-post.ts "Watch this" --video ./clip.mp4

# 发布头条文章
bun baoyu-post-to-weibo/scripts/weibo-article.ts article.md
bun baoyu-post-to-weibo/scripts/weibo-article.ts article.md --cover ./cover.jpg
```

---

### 内容转换

#### 14. baoyu-markdown-to-html

**功能**: 将 Markdown 转换为带样式的 HTML，支持微信公众号主题。

**支持的主题**:
- default
- grace
- simple
- modern

**功能特性**:
- 代码高亮
- 数学公式 (KaTeX)
- PlantUML 图表
- 脚注
- 警告框
- 信息图
- 外链转底部引用 (可选)

**配置**: 无需配置

**使用方法**:
```bash
# 基础转换
bun baoyu-markdown-to-html/scripts/main.ts article.md

# 指定主题
bun baoyu-markdown-to-html/scripts/main.ts article.md --theme grace

# 主题 + 颜色
bun baoyu-markdown-to-html/scripts/main.ts article.md --theme modern --color red

# 启用外链引用
bun baoyu-markdown-to-html/scripts/main.ts article.md --cite

# 保留第一个标题
bun baoyu-markdown-to-html/scripts/main.ts article.md --keep-title
```

---

#### 15. baoyu-url-to-markdown

**功能**: 抓取网页并转换为 Markdown。

**模式**:
- **auto**: 页面加载后自动抓取
- **wait**: 等待用户信号（需要登录的页面）

**配置**: 需要 Chrome 浏览器

**使用方法**:
```bash
# 自动模式
bun baoyu-url-to-markdown/scripts/main.ts <url>

# 等待模式
bun baoyu-url-to-markdown/scripts/main.ts <url> --wait

# 保存到指定文件
bun baoyu-url-to-markdown/scripts/main.ts <url> -o output.md

# 下载媒体文件
bun baoyu-url-to-markdown/scripts/main.ts <url> --download-media
```

---

#### 16. baoyu-danger-x-to-markdown

**功能**: 将 X (Twitter) 推文和文章转换为 Markdown。

**⚠️ 注意**: 使用逆向工程 API，需要用户同意。

**配置**: 需要 Chrome 浏览器，首次运行需登录

**使用方法**:
```bash
# 转换推文
bun baoyu-danger-x-to-markdown/scripts/main.ts <url>

# 保存到指定文件
bun baoyu-danger-x-to-markdown/scripts/main.ts <url> -o output.md

# 下载媒体
bun baoyu-danger-x-to-markdown/scripts/main.ts <url> --download-media

# JSON 输出
bun baoyu-danger-x-to-markdown/scripts/main.ts <url> --json
```

---

### 微信公众号工作流

完整的微信公众号文章生成流程，从原始文案到可发布 HTML。

#### 17. helleAI-wechat-article-complete

**功能**: 一站式完成微信公众号文章生成（三步流程）。

**工作流程**:
```
原始文案
    ↓
步骤1: 文案转写 (helleAI-wechat-step1-text-to-md)
    ↓
步骤2: 配图生成 (helleAI-wechat-step2-md-analyze-images)
    ↓
步骤3: HTML 整合 (helleAI-wechat-step3-md-to-html-by-images)
    ↓
最终 HTML
```

**配置**:
```bash
# .helleAI-skills/.env
# 图片生成 (选择一个)
HELLEAI_API_KEY=your_key_here
GOOGLE_API_KEY=your_key_here

# 微信公众号 API
WECHAT_APP_ID=your_app_id
WECHAT_APP_SECRET=your_app_secret
```

**使用方法**:
```bash
# 通过 AI 调用，自动执行三步流程
```

---

#### 18. helleAI-wechat-step1-text-to-md

**功能**: 将原始文案转写为 Markdown 格式。

**输出内容**:
- 3-5 个爆款标题
- 结构化 Markdown 正文
- Frontmatter 元数据

**配置**: 无需配置

**使用方法**:
```bash
# 通过 AI 调用
```

**输出**: `wechat-articles/YYYY-MM-DD/{slug}/{slug}.md`

---

#### 19. helleAI-wechat-step2-md-analyze-images

**功能**: 分析配图需求，生成图片，压缩，上传到微信公众号。

**处理流程**:
1. 分析文章，确定配图位置
2. 生成中文提示词
3. 调用图片生成 API
4. 压缩图片（封面 < 64KB）
5. 上传到微信公众号
6. 保存图片映射文件

**封面压缩策略**:
- 第1次: quality=80
- 第2次: quality=60 (如果 > 64KB)
- 第3次: quality=40 (如果仍 > 64KB)

**配置**: 同 `helleAI-wechat-article-complete`

**使用方法**:
```bash
# 通过 AI 调用
```

**输出**:
- `image-analysis.json`
- `image-mapping.json`
- `images/` 目录

---

#### 20. helleAI-wechat-step3-md-to-html-by-images

**功能**: 整合 Markdown 和图片 URL，生成最终 HTML。

**处理流程**:
1. 读取 Markdown 和 image-mapping.json
2. 转换 Markdown 为 HTML
3. 插入微信图片 URL
4. 验证图片数量一致性
5. 输出符合微信规范的 HTML

**配置**: 无需配置

**使用方法**:
```bash
# 通过 AI 调用
```

**输出**: `{slug}-final.html`

---

### 文档处理

#### 21. claude-skill-docx

**功能**: Word 文档创建、编辑和分析。

**功能特性**:
- 创建新文档
- 修改内容
- 跟踪更改
- 添加评论
- 格式保留

**配置**: 无需配置

**许可证**: Proprietary (查看 LICENSE.txt)

---

#### 22. claude-skill-xlsx

**功能**: Excel 电子表格创建、编辑和分析。

**功能特性**:
- 创建新表格
- 公式支持
- 格式化
- 数据分析
- 可视化

**配置**: 无需配置

**许可证**: Proprietary (查看 LICENSE.txt)

---

#### 23. claude-skill-pptx

**功能**: PowerPoint 演示文稿创建、编辑和分析。

**功能特性**:
- 创建新演示文稿
- 修改内容
- 布局管理
- 添加评论和演讲者备注

**配置**: 无需配置

**许可证**: Proprietary (查看 LICENSE.txt)

---

#### 24. claude-skill-pdf

**功能**: PDF 文档处理工具包。

**功能特性**:
- 提取文本和表格
- 创建新 PDF
- 合并/拆分文档
- 处理表单

**配置**: 无需配置

**许可证**: Proprietary (查看 LICENSE.txt)

---

### 其他工具

#### 25. baoyu-danger-gemini-web

**功能**: 通过逆向工程的 Gemini Web API 生成图片和文本。

**⚠️ 注意**: 使用逆向工程 API，需要用户同意。

**功能特性**:
- 文本生成
- 图片生成
- 视觉输入（参考图片）
- 多轮对话

**配置**: 需要 Chrome 浏览器，首次运行需登录

**使用方法**:
```bash
# 文本生成
bun baoyu-danger-gemini-web/scripts/main.ts "Your prompt"

# 图片生成
bun baoyu-danger-gemini-web/scripts/main.ts --prompt "A cute cat" --image cat.png

# 视觉输入
bun baoyu-danger-gemini-web/scripts/main.ts --prompt "Describe this" --reference image.png

# 多轮对话
bun baoyu-danger-gemini-web/scripts/main.ts "Remember: 42" --sessionId session-abc
bun baoyu-danger-gemini-web/scripts/main.ts "What number?" --sessionId session-abc
```

---

#### 26. claude-skill-skill-creator

**功能**: 创建新技能的指南。

**使用场景**: 当需要创建或更新技能时使用。

**配置**: 无需配置

**许可证**: 查看 LICENSE.txt

---

## 全局配置

### 环境变量文件

创建 `.helleAI-skills/.env` (项目级) 或 `~/.helleAI-skills/.env` (用户级):

```bash
# 图片生成 API (选择一个或多个)
HELLEAI_API_KEY=your_key_here
GOOGLE_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
DASHSCOPE_API_KEY=your_key_here
REPLICATE_API_TOKEN=your_token_here

# 微信公众号 API
WECHAT_APP_ID=your_app_id
WECHAT_APP_SECRET=your_app_secret

# Chrome 浏览器路径 (可选)
WECHAT_BROWSER_CHROME_PATH=/path/to/chrome
```

### 获取 API Key

**Helle.ai**:
- 访问: https://api.helle.ai
- 注册并获取 API Key

**Google Gemini**:
- 访问: https://aistudio.google.com/apikey
- 创建 API Key

**OpenAI**:
- 访问: https://platform.openai.com/api-keys
- 创建 API Key

**DashScope (阿里)**:
- 访问: https://dashscope.console.aliyun.com
- 获取 API Key

**Replicate**:
- 访问: https://replicate.com/account/api-tokens
- 创建 API Token

**微信公众号**:
1. 访问: https://mp.weixin.qq.com
2. 进入: 开发 → 基本配置
3. 复制 AppID 和 AppSecret

---

## 常见问题

### Q1: 如何选择图片生成供应商？

**A**: 推荐优先级：
1. **Helle.ai** - 推荐，性价比高
2. **Google Gemini** - 质量好
3. **OpenAI** - 稳定
4. **DashScope** - 国内访问快
5. **Replicate** - 模型选择多

配置多个供应商，系统会自动选择可用的。

### Q2: 微信公众号发布推荐使用哪种模式？

**A**: 推荐使用 **API 模式**：
- 更快速
- 更稳定
- 支持更多功能（评论控制、作者设置等）

浏览器模式适合：
- 没有 API 权限
- 需要预览效果

### Q3: 封面图片为什么要压缩到 64KB 以下？

**A**: 微信公众号 API 上传图片有大小限制，封面图片必须 < 64KB。系统会自动进行多次压缩直到满足要求。

### Q4: 如何处理 Chrome 浏览器自动化失败？

**A**: 
1. 确保 Chrome 已安装且是最新版本
2. 检查是否有权限问题（macOS 需要辅助功能权限）
3. 首次运行需要手动登录
4. 设置 `WECHAT_BROWSER_CHROME_PATH` 环境变量指定 Chrome 路径

### Q5: 技能之间如何协作？

**A**: 技能可以相互调用：
- `helleAI-wechat-article-complete` 调用步骤 1、2、3
- 步骤 2 调用 `baoyu-image-gen` 和 `baoyu-compress-image`
- 多个技能依赖 `baoyu-image-gen` 作为图片生成后端

### Q6: 如何自定义技能配置？

**A**: 大多数技能支持 `EXTEND.md` 配置文件：
- 项目级: `.helleAI-skills/{skill-name}/EXTEND.md`
- 用户级: `~/.helleAI-skills/{skill-name}/EXTEND.md`

查看各技能的 `references/config/preferences-schema.md` 了解支持的配置项。

---

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

- helleAI 技能: MIT License
- Claude 技能: Proprietary (查看各技能的 LICENSE.txt)

---

## 更新日志

### v1.0.0 (2024-01-15)

- 初始版本发布
- 包含 26 个技能
- 完整的微信公众号工作流
- 多供应商图片生成支持
- 社交媒体发布功能
