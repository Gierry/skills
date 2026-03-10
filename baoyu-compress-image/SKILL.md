---
name: baoyu-compress-image
description: Compresses images to WebP (default) or PNG with automatic tool selection. Use when user asks to "compress image", "optimize image", "convert to webp", or reduce image file size.
---

# Image Compressor

Compresses images using best available tool (sips → cwebp → ImageMagick → Sharp).

## Script Directory

Scripts in `scripts/` subdirectory. `${SKILL_DIR}` = this SKILL.md's directory path. Requires `bun` runtime. If not installed, run: `npm install -g bun`. Replace `${SKILL_DIR}` with actual values.

| Script | Purpose |
|--------|---------|
| `scripts/main.ts` | Image compression CLI |

## Preferences (EXTEND.md)

Check EXTEND.md existence (priority order):

```bash
# macOS, Linux, WSL, Git Bash
test -f .baoyu-skills/baoyu-compress-image/EXTEND.md && echo "project"
test -f "$HOME/.baoyu-skills/baoyu-compress-image/EXTEND.md" && echo "user"
```

```powershell
# PowerShell (Windows)
if (Test-Path .baoyu-skills/baoyu-compress-image/EXTEND.md) { "project" }
if (Test-Path "$HOME/.baoyu-skills/baoyu-compress-image/EXTEND.md") { "user" }
```

┌────────────────────────────────────────────────────────┬───────────────────┐
│                          Path                          │     Location      │
├────────────────────────────────────────────────────────┼───────────────────┤
│ .baoyu-skills/baoyu-compress-image/EXTEND.md           │ Project directory │
├────────────────────────────────────────────────────────┼───────────────────┤
│ $HOME/.baoyu-skills/baoyu-compress-image/EXTEND.md     │ User home         │
└────────────────────────────────────────────────────────┴───────────────────┘

┌───────────┬───────────────────────────────────────────────────────────────────────────┐
│  Result   │                                  Action                                   │
├───────────┼───────────────────────────────────────────────────────────────────────────┤
│ Found     │ Read, parse, apply settings                                               │
├───────────┼───────────────────────────────────────────────────────────────────────────┤
│ Not found │ Use defaults                                                              │
└───────────┴───────────────────────────────────────────────────────────────────────────┘

**EXTEND.md Supports**: Default format | Default quality | Keep original preference

## Usage

```bash
bun ${SKILL_DIR}/scripts/main.ts <input> [options]
```

## Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `<input>` | | File or directory | Required |
| `--output` | `-o` | Output path | Same path, new ext |
| `--format` | `-f` | webp, png, jpeg | webp |
| `--quality` | `-q` | Quality 0-100 | 80 |
| `--keep` | `-k` | Keep original | false |
| `--recursive` | `-r` | Process subdirs | false |
| `--json` | | JSON output | false |

## Examples

```bash
# Single file → WebP (replaces original)
bun ${SKILL_DIR}/scripts/main.ts image.png

# Keep PNG format
bun ${SKILL_DIR}/scripts/main.ts image.png -f png --keep

# Directory recursive
bun ${SKILL_DIR}/scripts/main.ts ./images/ -r -q 75

# JSON output
bun ${SKILL_DIR}/scripts/main.ts image.png --json
```

**Output**:
```
image.png → image.webp (245KB → 89KB, 64% reduction)
```

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.
