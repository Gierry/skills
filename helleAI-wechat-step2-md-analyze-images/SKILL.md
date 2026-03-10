---
name: helleAI-wechat-step2-md-analyze-images
description: 分析Markdown文章的配图需求,生成图片提示词,调用Helle.ai生成图片,压缩图片,上传到微信公众号获取URL。完整的图片处理流程,为最终HTML转换做准备。当用户要求"分析配图"、"生成文章图片"、"准备公众号图片"时使用。
---

# 微信公众号配图分析与生成 (步骤2)

分析文章配图需求,生成图片,压缩优化,上传到微信公众号,获取图片URL。

## 使用场景

- 已有Markdown格式的文章,需要配图
- 需要为文章的关键章节生成视觉化图片
- 准备发布到微信公众号的图片素材

## 工作流程

### 进度检查清单

```
配图处理进度:
- [ ] Step 1: 读取并分析Markdown文章
- [ ] Step 2: 生成配图分析JSON
- [ ] Step 3: 确认配图方案
- [ ] Step 3.5: 检查图片生成供应商配置
- [ ] Step 4: 生成图片
- [ ] Step 5: 压缩图片
- [ ] Step 6: 上传到微信公众号
- [ ] Step 7: 保存图片映射文件
- [ ] Step 8: 输出完成报告
```

### Step 1: 读取并分析Markdown文章

**输入**:
- Markdown文件路径 (来自Step 1的输出)

**分析内容**:

1. **文章逻辑分析**:
   - 识别文章结构(章节、小节)
   - 找出核心观点转折处
   - 确定需要视觉化的段落
   - 评估长文排版间隔需求

2. **配图位置判断**:
   - 封面图 (必须,1张)
   - 章节配图 (每300-500字配1张)
   - 重点说明配图 (复杂概念、流程图)
   - 总结配图 (可选)

3. **视觉风格确定**:
   - 根据文章主题选择风格
   - 确保全文视觉统一
   - 考虑微信公众号阅读体验

**风格选项**:

| 文章类型 | 推荐风格 | 特点 |
|---------|---------|------|
| 教程/操作指南 | 清新手绘插画 | 温暖治愈,易理解 |
| 技术/专业内容 | 扁平插画 | 简洁专业,信息清晰 |
| 生活/情感类 | 清新文艺 | 温馨亲切,情感共鸣 |
| 产品/评测 | 写实摄影 | 真实可信,细节丰富 |

### Step 2: 生成配图分析JSON

**JSON格式** (严格遵循):

```json
[
  {
    "序号": 1,
    "建议位置": "封面",
    "配图理由": "呼应文章主题,建立第一印象",
    "视觉基调": "清新手绘插画风格,暖色调,治愈系",
    "中文提示词": "微信公众号风格信息图,横版16:9比例（900×506）...",
    "图片宽度": 900,
    "图片高度": 506
  },
  {
    "序号": 2,
    "建议位置": "第一章结束处",
    "配图理由": "视觉化展现核心概念",
    "视觉基调": "清新手绘插画风格,暖色调,治愈系",
    "中文提示词": "微信公众号风格信息图,横版3:2比例（900×600）...",
    "图片宽度": 900,
    "图片高度": 600
  }
]
```

**字段说明**:

| 字段 | 类型 | 说明 |
|------|------|------|
| 序号 | 数字 | 图片顺序编号 |
| 建议位置 | 字符串 | 在文章中的具体位置 |
| 配图理由 | 字符串 | 为什么在这里配图 |
| 视觉基调 | 字符串 | 全文统一的视觉风格 |
| 中文提示词 | 字符串 | 详细的图片生成提示词 |
| 图片宽度 | 数字 | 固定900 (微信公众号建议) |
| 图片高度 | 数字 | 根据内容调整,建议<900 |

**提示词编写规范**:

1. **必须使用中文**: 所有描述用准确、优美的中文
2. **画面感强**: 使用具体的名词和形容词
3. **风格一致**: 所有图片的"视觉基调"必须相同
4. **包含规范元素**:
   - 尺寸比例说明
   - 背景颜色和质感
   - 主体内容描述
   - 文字排版(如有)
   - 装饰元素
   - 整体氛围

**图片视觉规范**:

| 规范项 | 要求 |
|--------|------|
| 尺寸 | 宽900px,高度<900px |
| 背景色 | 奶油白#FFF8E7 / 薄荷绿#E8F5E9 / 樱花粉#FFE4E6 等 |
| 文字(如有) | 标题特大号加粗,正文中等,深色系 |
| 装饰元素 | 手绘小图标、emoji、简笔画、便签纸等 |
| 留白 | 四周边距充足,内容区域留白适当 |

**保存JSON文件**:

```
wechat-articles/YYYY-MM-DD/{slug}/
└── image-analysis.json
```

### Step 3: 确认配图方案

**使用 AskUserQuestion 确认**:

```
header: "配图方案"
question: "已分析出 N 张配图需求,是否确认生成?"
options:
  - label: "确认生成 (推荐)"
    description: "开始生成所有图片"
  - label: "调整方案"
    description: "修改图片数量或位置"
  - label: "查看详情"
    description: "显示每张图片的详细信息"
```

**显示配图概览**:

```
配图方案:
- 图片总数: N 张
- 视觉风格: [统一风格]
- 预计生成时间: [N × 30秒]

图片列表:
1. 封面 (900×506) - [配图理由]
2. 第一章 (900×600) - [配图理由]
3. 第二章 (900×600) - [配图理由]
...
```

### Step 3.5: 检查图片生成供应商配置

**⚠️ 关键步骤**: 在生成图片之前,必须确认有可用的图片生成供应商。

**供应商选择算法**:

```
1. 默认供应商: Helle.ai
2. 如果 Helle.ai 未配置 API Key:
   → 查找其他已配置 Key 的供应商
3. 如果没有任何供应商配置 Key:
   → 报错并终止流程
4. 如果有可用供应商:
   → 继续生成流程
```

**检查步骤**:

1. **检查 Helle.ai API Key**:

```bash
# 检查项目级配置
test -f .helleAI-skills/.env && grep -q "HELLEAI_API_KEY" .helleAI-skills/.env

# 检查用户级配置
test -f ~/.helleAI-skills/.env && grep -q "HELLEAI_API_KEY" ~/.helleAI-skills/.env
```

2. **如果 Helle.ai 未配置,检查其他供应商**:

按优先级顺序检查:

| 供应商 | 环境变量 | 优先级 |
|--------|---------|--------|
| Helle.ai | `HELLEAI_API_KEY` | 1 (默认) |
| Google | `GOOGLE_API_KEY` | 2 |
| OpenAI | `OPENAI_API_KEY` | 3 |
| DashScope | `DASHSCOPE_API_KEY` | 4 |
| Replicate | `REPLICATE_API_TOKEN` | 5 |

3. **检查所有供应商**:

```bash
# 检查所有可能的 API Key
for key in HELLEAI_API_KEY GOOGLE_API_KEY OPENAI_API_KEY DASHSCOPE_API_KEY REPLICATE_API_TOKEN; do
  if grep -q "$key" .helleAI-skills/.env 2>/dev/null || grep -q "$key" ~/.helleAI-skills/.env 2>/dev/null; then
    echo "找到配置: $key"
  fi
done
```

**配置文件位置**:

| 位置 | 路径 | 优先级 |
|------|------|--------|
| 项目级 | `.helleAI-skills/.env` | 高 |
| 用户级 | `~/.helleAI-skills/.env` | 低 |

**检查结果处理**:

**情况1: Helle.ai 已配置** ✅

```
✓ 检测到 Helle.ai API Key
供应商: Helle.ai
模型: gemini-3.1-flash-image-preview
继续生成流程...
```

**情况2: Helle.ai 未配置,但有其他供应商** ⚠️

```
⚠ Helle.ai 未配置,使用备选供应商

已找到可用供应商:
- Google (GOOGLE_API_KEY)

将使用: Google
模型: gemini-3-pro-image-preview
继续生成流程...
```

**情况3: 没有任何供应商配置** ❌

```
❌ 错误: 未找到任何图片生成供应商的 API Key

需要配置至少一个供应商才能生成图片。

推荐配置 (按优先级):
1. Helle.ai - 推荐
2. Google Gemini
3. OpenAI
4. DashScope (阿里通义万象)
5. Replicate

配置步骤:
1. 选择一个供应商并获取 API Key
2. 编辑配置文件:
   - 项目级: .helleAI-skills/.env
   - 用户级: ~/.helleAI-skills/.env (推荐)

3. 添加对应的环境变量:
   HELLEAI_API_KEY=你的Key    # Helle.ai
   GOOGLE_API_KEY=你的Key          # Google
   OPENAI_API_KEY=你的Key          # OpenAI
   DASHSCOPE_API_KEY=你的Key       # DashScope
   REPLICATE_API_TOKEN=你的Token   # Replicate

4. 保存文件后重新执行

获取 API Key:
- Helle.ai: https://api.helle.ai
- Google: https://aistudio.google.com/apikey
- OpenAI: https://platform.openai.com/api-keys
- DashScope: https://dashscope.console.aliyun.com
- Replicate: https://replicate.com/account/api-tokens

流程已终止。请配置 API Key 后重试。
```

**供应商选择逻辑实现**:

```javascript
// 伪代码示例
function selectProvider() {
  const providers = [
    { name: 'helleai', key: 'HELLEAI_API_KEY', model: 'gemini-3.1-flash-image-preview' },
    { name: 'google', key: 'GOOGLE_API_KEY', model: 'gemini-3-pro-image-preview' },
    { name: 'openai', key: 'OPENAI_API_KEY', model: 'gpt-image-1.5' },
    { name: 'dashscope', key: 'DASHSCOPE_API_KEY', model: 'z-image-turbo' },
    { name: 'replicate', key: 'REPLICATE_API_TOKEN', model: 'google/nano-banana-pro' }
  ];
  
  for (const provider of providers) {
    if (hasApiKey(provider.key)) {
      return provider;
    }
  }
  
  throw new Error('未找到任何已配置的供应商');
}
```

**输出选定的供应商信息**:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 图片生成供应商配置
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
供应商: [选定的供应商名称]
模型: [对应的模型]
配置来源: [项目级/.helleAI-skills/.env 或 用户级/~/.helleAI-skills/.env]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 4: 生成图片

**调用 helleAI-image-gen 技能**:

使用 Step 3.5 中选定的供应商和模型,对每张图片执行:

```bash
bun ${SKILL_DIR}/../helleAI-image-gen/scripts/main.ts \
  --prompt "[中文提示词]" \
  --provider [选定的供应商] \
  --model [对应的模型] \
  --size [宽度]x[高度] \
  --image "wechat-articles/YYYY-MM-DD/{slug}/images/[序号]-original.png"
```

**供应商和模型对应关系**:

| 供应商 | 默认模型 | 说明 |
|--------|---------|------|
| helleai | gemini-3.1-flash-image-preview | Helle.ai (推荐) |
| google | gemini-3-pro-image-preview | Google Gemini |
| openai | gpt-image-1.5 | OpenAI GPT Image |
| dashscope | z-image-turbo | 阿里通义万象 |
| replicate | google/nano-banana-pro | Replicate |

**生成策略**:

1. **顺序生成**: 一张一张生成,不并行
2. **进度报告**: 每生成一张,报告进度 "已生成 X/N"
3. **错误重试**: 失败自动重试一次
4. **保存原图**: 命名为 `[序号]-original.png`

**文件结构**:

```
wechat-articles/YYYY-MM-DD/{slug}/
├── {slug}.md                    # 原始Markdown
├── image-analysis.json          # 配图分析
└── images/
    ├── 01-original.png          # 原始生成图
    ├── 02-original.png
    └── ...
```

### Step 5: 压缩图片

**调用 helleAI-compress-image 技能**:

对每张原图执行压缩:

```bash
bun ${SKILL_DIR}/../helleAI-compress-image/scripts/main.ts \
  "wechat-articles/YYYY-MM-DD/{slug}/images/[序号]-original.png" \
  --format webp \
  --quality 80 \
  --output "wechat-articles/YYYY-MM-DD/{slug}/images/[序号]-compressed.webp"
```

**⚠️ 封面图片特殊处理（序号=1）**:

封面图片用于微信公众号 API 上传，有严格的大小限制：**必须 < 64KB**

**封面压缩流程**:

1. **第一次压缩** (quality=80):
   ```bash
   bun ${SKILL_DIR}/../helleAI-compress-image/scripts/main.ts \
     "wechat-articles/YYYY-MM-DD/{slug}/images/01-original.png" \
     --format webp \
     --quality 80 \
     --output "wechat-articles/YYYY-MM-DD/{slug}/images/01-compressed.webp"
   ```

2. **检查文件大小**:
   ```bash
   # 获取文件大小（字节）
   file_size=$(stat -f%z "wechat-articles/YYYY-MM-DD/{slug}/images/01-compressed.webp" 2>/dev/null || stat -c%s "wechat-articles/YYYY-MM-DD/{slug}/images/01-compressed.webp")
   ```

3. **如果 > 64KB，进行二次压缩** (quality=60):
   ```bash
   if [ $file_size -gt 65536 ]; then
     bun ${SKILL_DIR}/../helleAI-compress-image/scripts/main.ts \
       "wechat-articles/YYYY-MM-DD/{slug}/images/01-original.png" \
       --format webp \
       --quality 60 \
       --output "wechat-articles/YYYY-MM-DD/{slug}/images/01-compressed.webp"
   fi
   ```

4. **再次检查**，如果仍 > 64KB，进行三次压缩 (quality=40):
   ```bash
   file_size=$(stat -f%z "wechat-articles/YYYY-MM-DD/{slug}/images/01-compressed.webp" 2>/dev/null || stat -c%s "wechat-articles/YYYY-MM-DD/{slug}/images/01-compressed.webp")
   if [ $file_size -gt 65536 ]; then
     bun ${SKILL_DIR}/../helleAI-compress-image/scripts/main.ts \
       "wechat-articles/YYYY-MM-DD/{slug}/images/01-original.png" \
       --format webp \
       --quality 40 \
       --output "wechat-articles/YYYY-MM-DD/{slug}/images/01-compressed.webp"
   fi
   ```

5. **最终验证**:
   - 如果仍 > 64KB，报告警告并建议手动处理
   - 记录最终文件大小

**封面压缩策略表**:

| 尝试次数 | Quality | 目标 | 说明 |
|---------|---------|------|------|
| 第1次 | 80 | < 64KB | 保持较高质量 |
| 第2次 | 60 | < 64KB | 中等质量，大幅减小体积 |
| 第3次 | 40 | < 64KB | 低质量，最大压缩 |
| 失败 | - | 手动处理 | 提示用户手动优化 |

**其他图片压缩参数**:
- 格式: WebP (微信支持,体积小)
- 质量: 80 (平衡质量和大小)
- 保留原图: 不删除original.png

**压缩后文件结构**:

```
images/
├── 01-original.png              # 封面原图
├── 01-compressed.webp           # 封面压缩图 (< 64KB)
├── 02-original.png              # 内容图原图
├── 02-compressed.webp           # 内容图压缩图
└── ...
```

**压缩报告**:

在完成报告中显示封面图片的压缩详情:

```
封面图片压缩:
- 原始大小: 245KB
- 第1次压缩 (quality=80): 89KB ❌ > 64KB
- 第2次压缩 (quality=60): 58KB ✓ < 64KB
- 最终大小: 58KB
- 压缩率: 76%
```

### Step 6: 上传到微信公众号

**⚠️ 重要**: 这一步需要调用微信公众号API上传图片。

**前置条件检查**:

1. 检查是否有微信公众号API凭证:

```bash
# 检查 .helleAI-skills/.env 或 ~/.helleAI-skills/.env
test -f .helleAI-skills/.env && grep -q "WECHAT_APP_ID" .helleAI-skills/.env
```

2. 如果没有凭证,引导用户配置:

```
需要微信公众号API凭证才能上传图片。

获取步骤:
1. 访问 https://mp.weixin.qq.com
2. 进入: 开发 → 基本配置
3. 复制 AppID 和 AppSecret

保存位置:
A) 项目级: .helleAI-skills/.env
B) 用户级: ~/.helleAI-skills/.env (推荐)

格式:
WECHAT_APP_ID=你的AppID
WECHAT_APP_SECRET=你的AppSecret
```

**上传流程**:

1. **获取access_token**:

```bash
curl "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WECHAT_APP_ID}&secret=${WECHAT_APP_SECRET}"
```

2. **上传图片** (对每张压缩图):

```bash
curl -F "media=@wechat-articles/YYYY-MM-DD/{slug}/images/[序号]-compressed.webp" \
  "https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${ACCESS_TOKEN}&type=image"
```

3. **解析响应**,获取 `media_id` 和 `url`

**响应示例**:

```json
{
  "media_id": "MEDIA_ID",
  "url": "http://mmbiz.qpic.cn/..."
}
```

**错误处理**:

| 错误码 | 说明 | 处理方式 |
|--------|------|---------|
| 40001 | access_token无效 | 重新获取token |
| 40007 | 图片格式不支持 | 转换为jpg格式重试 |
| 45009 | 接口调用超限 | 等待后重试 |

### Step 7: 保存图片映射文件

**创建 image-mapping.json**:

```json
{
  "article_slug": "{slug}",
  "generated_at": "2024-01-15T10:30:00Z",
  "total_images": 3,
  "images": [
    {
      "序号": 1,
      "建议位置": "封面",
      "local_original": "images/01-original.png",
      "local_compressed": "images/01-compressed.webp",
      "wechat_media_id": "MEDIA_ID_1",
      "wechat_url": "http://mmbiz.qpic.cn/...",
      "file_size_original": "245KB",
      "file_size_compressed": "89KB",
      "compression_ratio": "64%"
    },
    {
      "序号": 2,
      "建议位置": "第一章结束处",
      "local_original": "images/02-original.png",
      "local_compressed": "images/02-compressed.webp",
      "wechat_media_id": "MEDIA_ID_2",
      "wechat_url": "http://mmbiz.qpic.cn/...",
      "file_size_original": "312KB",
      "file_size_compressed": "118KB",
      "compression_ratio": "62%"
    }
  ]
}
```

**保存位置**:

```
wechat-articles/YYYY-MM-DD/{slug}/
└── image-mapping.json
```

### Step 8: 输出完成报告

```
✅ 配图处理完成!

文章: {slug}
图片总数: N 张
视觉风格: [统一风格]

处理详情:
┌────┬──────────┬─────────┬─────────┬──────────┐
│ 序号│  位置    │ 原图大小│ 压缩后  │ 压缩率   │
├────┼──────────┼─────────┼─────────┼──────────┤
│ 1  │ 封面     │ 245KB   │ 89KB    │ 64%      │
│ 2  │ 第一章   │ 312KB   │ 118KB   │ 62%      │
│ 3  │ 第二章   │ 278KB   │ 102KB   │ 63%      │
└────┴──────────┴─────────┴─────────┴──────────┘

文件位置:
- 配图分析: image-analysis.json
- 图片映射: image-mapping.json
- 图片目录: images/

微信公众号URL已获取,可用于下一步HTML生成。

下一步: 使用 helleAI-wechat-step3-md-to-html-by-images 生成最终HTML
```

## 子流程详解

### 子流程 2.1: 文章逻辑分析

**目标**: 识别最需要配图的位置

**分析维度**:

1. **文章长度**:
   - <500字: 1-2张图
   - 500-1000字: 2-3张图
   - 1000-2000字: 3-5张图
   - >2000字: 5-8张图

2. **内容类型**:
   - 教程: 每个步骤配图
   - 观点: 核心论点配图
   - 评测: 产品特写配图
   - 故事: 情绪转折配图

3. **视觉节奏**:
   - 开头: 封面图(必须)
   - 中间: 每300-500字一张
   - 结尾: 总结图(可选)

### 子流程 2.2: 提示词生成

**模板结构**:

```
微信公众号风格信息图,横版[比例]（[宽]×[高]）,[风格描述]。

背景：[颜色]色[样式]背景,颜色值：[HEX],带[质感]质感。

画面[位置][主体描述],[动作/状态],[周围元素]。

[文字区域]区域,[标题文字]'[内容]',[字体样式],[颜色],颜色值：[HEX],[效果]。

[装饰元素描述]。

整体氛围[氛围词],留白充足,视觉层次分明,[风格统一性]。
```

**示例**:

```
微信公众号风格信息图,横版16:9比例（900×506）,清新手绘插画风格。

背景：奶油白色纯色背景,颜色值：#FFF8E7,带轻微纸张纹理质感。

画面中央一个可爱的卡通女孩坐在书桌前,手托下巴微笑,桌上有笔记本电脑和一杯咖啡,周围漂浮着小星星和爱心装饰。

图片顶部区域,主标题'职场新人成长指南',特大号圆润手写体,深棕色,颜色值：#5D4037,加粗,标题下方有粉色荧光笔划线效果。

整体氛围温暖治愈,留白充足,视觉层次分明,所有元素均为手绘风格。
```

### 子流程 2.3: 图片生成优化

**生成参数优化**:

| 参数 | 值 | 说明 |
|------|---|------|
| provider | helleai | 使用Helle.ai |
| model | gemini-3.1-flash-image-preview | 最新模型 |
| size | 900x[高度] | 微信建议宽度 |
| quality | 默认 | 使用默认质量 |

**生成监控**:

1. 记录每张图片生成时间
2. 检测生成失败并重试
3. 验证生成图片尺寸
4. 检查图片文件完整性

### 子流程 2.4: 压缩策略

**压缩目标**:
- 保持视觉质量
- 减小文件体积(目标<100KB)
- 加快加载速度

**压缩参数选择**:

| 原图大小 | 质量参数 | 预期压缩率 |
|---------|---------|-----------|
| <200KB | 85 | 40-50% |
| 200-500KB | 80 | 60-70% |
| >500KB | 75 | 70-80% |

### 子流程 2.5: 上传重试机制

**重试策略**:

1. **首次失败**: 等待2秒,重试
2. **二次失败**: 转换格式(webp→jpg),重试
3. **三次失败**: 报告错误,跳过该图片

**备用方案**:

如果API上传失败,提供手动上传指引:

```
自动上传失败,请手动上传:

1. 登录微信公众号后台
2. 进入: 素材管理 → 图片
3. 上传以下图片:
   - images/01-compressed.webp
   - images/02-compressed.webp
   ...
4. 复制图片URL,手动填入 image-mapping.json
```

## 注意事项

### ✅ 必须做到

1. **视觉统一**: 所有图片使用相同的视觉基调
2. **尺寸规范**: 宽度固定900px,高度<900px
3. **顺序生成**: 不要并行生成,避免资源冲突
4. **保留原图**: 压缩后不删除原图
5. **错误处理**: 失败自动重试,记录错误日志

### ❌ 禁止行为

1. **不要修改JSON格式**: 严格按照schema生成
2. **不要使用英文提示词**: 必须使用中文
3. **不要跳过压缩**: 即使原图较小也要压缩
4. **不要忽略上传失败**: 必须获取微信URL
5. **不要删除中间文件**: 保留所有生成的文件

## 与其他技能的集成

**工作流位置**: 第2步 (共3步)

```
Step 1: helleAI-wechat-step1-text-to-md
  ↓ 输入: Markdown文件
Step 2: helleAI-wechat-step2-md-analyze-images (当前)
  ↓ 输出: Markdown + 图片 + image-mapping.json
Step 3: helleAI-wechat-step3-md-to-html-by-images
  ↓ 输出: 最终HTML
```

**输入要求**:
- Markdown文件路径
- 文件必须存在且可读

**输出内容**:
- image-analysis.json (配图分析)
- image-mapping.json (图片映射)
- images/ 目录 (所有图片文件)

## 依赖技能

- **helleAI-image-gen**: 图片生成
- **helleAI-compress-image**: 图片压缩
- **微信公众号API**: 图片上传

## 参考资料

完整的提示词指南请参考: [prompt.md](prompt.md)
