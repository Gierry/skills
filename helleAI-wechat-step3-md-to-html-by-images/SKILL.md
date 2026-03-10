---
name: helleAI-wechat-step3-md-to-html-by-images
description: 将Markdown和微信公众号图片URL整合为最终HTML。读取image-mapping.json获取所有图片URL,将URL插入到HTML对应位置,输出符合微信公众号规范的完整HTML。当用户要求"生成最终HTML"、"整合图片URL"、"完成公众号文章"时使用。
---

# 微信公众号最终HTML生成 (步骤3)

将Markdown内容和微信公众号图片URL整合为最终的HTML代码。

## 使用场景

- 已有Markdown文章和图片映射文件
- 需要将微信公众号图片URL插入到HTML中
- 生成可直接发布的最终HTML代码

## 工作流程

### 进度检查清单

```
HTML生成进度:
- [ ] Step 1: 读取输入文件
- [ ] Step 2: 解析图片映射关系
- [ ] Step 3: 转换Markdown为HTML结构
- [ ] Step 4: 插入微信图片URL
- [ ] Step 5: 验证图片数量
- [ ] Step 6: 保存最终HTML
- [ ] Step 7: 输出完成报告
```

### Step 1: 读取输入文件

**必需文件**:

1. **Markdown文件**: `wechat-articles/YYYY-MM-DD/{slug}/{slug}.md`
2. **图片映射文件**: `wechat-articles/YYYY-MM-DD/{slug}/image-mapping.json`

**验证文件存在**:

```bash
# 检查Markdown文件
test -f "wechat-articles/YYYY-MM-DD/{slug}/{slug}.md" || echo "Markdown文件不存在"

# 检查图片映射文件
test -f "wechat-articles/YYYY-MM-DD/{slug}/image-mapping.json" || echo "图片映射文件不存在"
```

**如果文件缺失**:

```
错误: 缺少必需文件

请确保已完成前两步:
1. Step 1: 生成Markdown文件
2. Step 2: 生成图片并上传到微信

当前缺少:
- [x] Markdown文件
- [ ] 图片映射文件 ← 请先运行 Step 2
```

### Step 2: 解析图片映射关系

**读取 image-mapping.json**:

```json
{
  "article_slug": "example-article",
  "generated_at": "2024-01-15T10:30:00Z",
  "total_images": 3,
  "images": [
    {
      "序号": 1,
      "建议位置": "封面",
      "wechat_url": "http://mmbiz.qpic.cn/...",
      ...
    },
    {
      "序号": 2,
      "建议位置": "第一章结束处",
      "wechat_url": "http://mmbiz.qpic.cn/...",
      ...
    }
  ]
}
```

**提取关键信息**:

| 字段 | 用途 |
|------|------|
| total_images | 验证图片总数 |
| images[].序号 | 图片插入顺序 |
| images[].建议位置 | 确定插入位置 |
| images[].wechat_url | 微信图片URL |

**构建位置映射表**:

```javascript
const imageMap = {
  "封面": "http://mmbiz.qpic.cn/image1...",
  "第一章结束处": "http://mmbiz.qpic.cn/image2...",
  "第二章结束处": "http://mmbiz.qpic.cn/image3...",
  ...
}
```

### Step 3: 转换Markdown为HTML结构

**转换规则**:

| Markdown | HTML |
|----------|------|
| `## 标题` | `<h2>` 标题 |
| `### 标题` | `<h3>` 标题 |
| 普通段落 | `<p>` 段落 |
| `**加粗**` | `<span style="font-weight: bold;">` |
| `- 列表` | `<p>` + 蓝色圆点 |
| `> 引用` | `<section>` 引用块 |
| ` ```bash ` | macOS窗口风格代码块 |
| `> ⚠️ **重点**` | 重点贴纸样式 |

**⚠️ 微信HTML规范**:

1. **禁止使用 `<div>`**: 全部用 `<section>` 替代
2. **禁止使用 `<ul><li>`**: 用 `<p>` + 圆点模拟
3. **所有样式内联**: 不能使用外部CSS
4. **添加 visibility**: 所有元素加 `visibility: visible`

### Step 4: 插入微信图片URL

**插入策略**:

1. **识别插入位置**:
   - 封面: 在第一个段落之前
   - 章节图: 在对应章节标题之后
   - 结尾图: 在最后一个段落之后

2. **匹配位置描述**:
   - "封面" → 文章开头
   - "第一章结束处" → 第一个 `<h2>` 之后
   - "第二章结束处" → 第二个 `<h2>` 之后
   - "总结段落前" → 最后一个段落之前

3. **生成图片HTML**:

```html
<section style="text-align: center; margin: 16px 0;">
  <img src="[微信图片URL]" style="height: auto !important; visibility: visible !important; max-width: 100%;" alt="配图">
</section>
```

### Step 5: 验证图片数量

**⚠️ 最重要的检查**:

```javascript
// 统计输入图片数量
const inputImageCount = imageMapping.total_images;

// 统计输出HTML中的图片数量
const outputImageCount = countImagesInHTML(html);

// 验证
if (inputImageCount !== outputImageCount) {
  throw new Error(`图片数量不匹配! 输入:${inputImageCount}, 输出:${outputImageCount}`);
}
```

**检查清单**:

- [ ] 图片总数: 输入 = 输出
- [ ] 图片URL: 全部是微信公众号URL
- [ ] 图片顺序: 与image-mapping.json一致
- [ ] 图片位置: 在正确的章节附近
- [ ] 图片样式: 使用居中样式

### Step 6: 保存最终HTML

**文件命名**:

```
wechat-articles/YYYY-MM-DD/{slug}/
└── {slug}-final.html
```

**备份策略**:

如果文件已存在:

```bash
# 备份现有文件
mv "{slug}-final.html" "{slug}-final-backup-YYYYMMDD-HHMMSS.html"
```

### Step 7: 输出完成报告

```
✅ 最终HTML生成完成!

文章: {slug}
文件: wechat-articles/YYYY-MM-DD/{slug}/{slug}-final.html

内容统计:
- 字数: [统计字数]
- 章节: [H2数量]
- 图片: [图片数量] ✓ 已验证

图片详情:
┌────┬──────────────┬─────────────────────────────┐
│ 序号│    位置      │         微信URL             │
├────┼──────────────┼─────────────────────────────┤
│ 1  │ 封面         │ http://mmbiz.qpic.cn/...    │
│ 2  │ 第一章结束处 │ http://mmbiz.qpic.cn/...    │
│ 3  │ 第二章结束处 │ http://mmbiz.qpic.cn/...    │
└────┴──────────────┴─────────────────────────────┘

HTML规范检查:
✓ 无 <div> 标签
✓ 无 <ul><li> 结构
✓ 所有样式内联
✓ 已添加 visibility: visible
✓ 图片数量一致

下一步: 可以直接复制HTML内容到微信公众号编辑器,或使用 helleAI-post-to-wechat 自动发布
```

## 注意事项

### ✅ 必须做到

1. **图片数量一致**: 输入N张 = 输出N张
2. **URL保持不变**: 使用微信公众号URL
3. **位置准确**: 图片在正确的章节附近
4. **样式规范**: 符合微信HTML规范
5. **验证完整**: 输出前执行所有检查

### ❌ 禁止行为

1. **不要删除图片**: 即使觉得不合适
2. **不要添加图片**: 只用image-mapping.json中的
3. **不要修改URL**: 保持微信URL原样
4. **不要使用禁用标签**: `<div>`, `<ul><li>`
5. **不要遗漏样式**: 所有元素必须有内联样式

## 与其他技能的集成

**工作流位置**: 第3步 (共3步,最后一步)

```
Step 1: helleAI-wechat-step1-text-to-md
  ↓ 输出: Markdown文件
Step 2: helleAI-wechat-step2-md-analyze-images
  ↓ 输出: Markdown + 图片 + image-mapping.json
Step 3: helleAI-wechat-step3-md-to-html-by-images (当前)
  ↓ 输出: 最终HTML
```

## 参考资料

完整的提示词指南请参考: [prompt.md](prompt.md)
