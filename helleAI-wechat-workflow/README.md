# 微信公众号文章生成完整工作流

三步完成从原始文案到可发布HTML的完整流程。

## 工作流概览

```
原始文案
    ↓
【步骤1】helleAI-wechat-step1-text-to-md
    - 转写为Markdown格式
    - 生成爆款标题
    - 优化文章结构
    ↓ 输出: {slug}.md
【步骤2】helleAI-wechat-step2-md-analyze-images
    - 分析配图需求
    - 生成图片(Helle.ai)
    - 压缩图片
    - 上传到微信公众号
    ↓ 输出: image-mapping.json + 图片文件
【步骤3】helleAI-wechat-step3-md-to-html-by-images
    - 转换Markdown为HTML
    - 插入微信图片URL
    - 验证图片数量
    ↓ 输出: {slug}-final.html
最终HTML (可直接发布)
```

## 文件结构

```
wechat-articles/
└── YYYY-MM-DD/
    └── {slug}/
        ├── {slug}.md                    # Step 1 输出
        ├── image-analysis.json          # Step 2 生成
        ├── image-mapping.json           # Step 2 输出
        ├── images/
        │   ├── 01-original.png          # Step 2 生成
        │   ├── 01-compressed.webp       # Step 2 压缩
        │   ├── 02-original.png
        │   ├── 02-compressed.webp
        │   └── ...
        └── {slug}-final.html            # Step 3 输出
```

## 使用方法

### 方式1: 逐步执行

```
1. 运行 Step 1:
   "请使用 helleAI-wechat-step1-text-to-md 转写这段文案: [粘贴文案]"

2. 运行 Step 2:
   "请使用 helleAI-wechat-step2-md-analyze-images 为文章配图"

3. 运行 Step 3:
   "请使用 helleAI-wechat-step3-md-to-html-by-images 生成最终HTML"
```

### 方式2: 一次性执行

```
"请使用微信公众号三步工作流处理这段文案:

[粘贴文案]

要求:
1. 转写为Markdown
2. 生成3-5张配图
3. 输出最终HTML"
```

## 各步骤详细说明

### Step 1: 文案转写

**技能**: `helleAI-wechat-step1-text-to-md`

**输入**: 原始文案(文本或文件)

**处理**:
- 分析文案类型和目标受众
- 生成3-5个爆款标题选项
- 转写为结构化Markdown
- 优化段落和重点标记

**输出**:
- `{slug}.md` - Markdown文件
- 包含frontmatter(标题、日期、slug)

**关键点**:
- 每段不超过3行
- 重点用 `**加粗**`
- 代码块只用于真正的代码
- 重点提醒用引用块

### Step 2: 配图生成

**技能**: `helleAI-wechat-step2-md-analyze-images`

**输入**: Step 1 的Markdown文件

**处理**:
1. 分析文章逻辑,确定配图位置
2. 生成配图分析JSON
3. 调用Helle.ai生成图片
4. 压缩图片(WebP格式)
5. 上传到微信公众号
6. 保存图片映射关系

**输出**:
- `image-analysis.json` - 配图分析
- `image-mapping.json` - 图片映射(含微信URL)
- `images/` - 所有图片文件

**关键点**:
- 封面图必须有
- 每300-500字配1张图
- 视觉风格统一
- 图片宽度固定900px

### Step 3: HTML生成

**技能**: `helleAI-wechat-step3-md-to-html-by-images`

**输入**:
- Step 1 的Markdown文件
- Step 2 的image-mapping.json

**处理**:
1. 读取Markdown和图片映射
2. 转换Markdown为HTML结构
3. 插入微信图片URL到对应位置
4. 验证图片数量一致性
5. 应用微信HTML规范

**输出**:
- `{slug}-final.html` - 最终HTML

**关键点**:
- 图片数量必须一致
- 禁用 `<div>` 和 `<ul><li>`
- 所有样式内联
- 添加 `visibility: visible`

## 质量检查清单

### Step 1 检查

- [ ] 标题吸引人且不夸张
- [ ] 段落简短(每段≤3行)
- [ ] 重点内容已加粗
- [ ] 代码块使用正确
- [ ] 文章结构清晰

### Step 2 检查

- [ ] 封面图已生成
- [ ] 配图数量合理(2-5张)
- [ ] 视觉风格统一
- [ ] 图片已压缩
- [ ] 微信URL已获取

### Step 3 检查

- [ ] 图片数量: 输入 = 输出
- [ ] 图片URL全部是微信URL
- [ ] 无 `<div>` 标签
- [ ] 无 `<ul><li>` 结构
- [ ] 样式全部内联
- [ ] 已添加 `visibility: visible`

## 常见问题

### Q1: 如果Step 2上传图片失败怎么办?

**A**: 有两种解决方案:

1. **自动重试**: 脚本会自动重试,并尝试转换格式(webp→jpg)
2. **手动上传**: 如果自动失败,按照提示手动上传到微信后台,然后更新image-mapping.json

### Q2: 可以跳过某个步骤吗?

**A**: 不建议跳过,但可以:

- **跳过Step 2**: 如果不需要配图,直接从Step 1到Step 3,但需要手动创建空的image-mapping.json
- **重新执行某步**: 每步都有备份机制,可以安全重新执行

### Q3: 如何修改已生成的内容?

**A**: 
- **修改文案**: 编辑 `{slug}.md`,然后重新执行Step 3
- **修改配图**: 重新执行Step 2,会自动备份旧图片
- **修改HTML**: 直接编辑 `{slug}-final.html`

### Q4: 生成的图片不满意怎么办?

**A**:
1. 编辑 `image-analysis.json` 中的提示词
2. 重新执行Step 2的图片生成部分
3. 或者手动替换 `images/` 中的图片文件

### Q5: 如何发布到微信公众号?

**A**: 有两种方式:

1. **手动复制**: 打开 `{slug}-final.html`,复制HTML代码,粘贴到微信编辑器
2. **自动发布**: 使用 `helleAI-post-to-wechat` 技能自动发布

## 技能依赖

### 必需技能

- `helleAI-wechat-step1-text-to-md` - 文案转写
- `helleAI-wechat-step2-md-analyze-images` - 配图生成
- `helleAI-wechat-step3-md-to-html-by-images` - HTML生成

### 依赖技能

- `helleAI-image-gen` - 图片生成(Step 2使用)
- `helleAI-compress-image` - 图片压缩(Step 2使用)
- `helleAI-post-to-wechat` - 自动发布(可选)

### 外部依赖

- **Helle.ai API**: 图片生成
- **微信公众号API**: 图片上传
- **Bun运行时**: 脚本执行

## 配置要求

### 环境变量

在 `.helleAI-skills/.env` 或 `~/.helleAI-skills/.env` 中配置:

```bash
# Helle.ai (图片生成)
HELLEAI_API_KEY=your_key_here

# 微信公众号 (图片上传)
WECHAT_APP_ID=your_app_id
WECHAT_APP_SECRET=your_app_secret
```

### 首次使用

1. 确保已安装所有依赖技能
2. 配置环境变量
3. 运行一次完整流程测试

## 最佳实践

### 文案准备

- 提供清晰的原始文案
- 说明目标受众和风格偏好
- 如有特殊要求,提前说明

### 配图优化

- 封面图最重要,多花时间调整
- 保持视觉风格统一
- 图片不要过多(2-5张最佳)

### HTML检查

- 发布前在微信编辑器预览
- 检查移动端显示效果
- 确认所有图片正常加载

## 更新日志

### v1.0.0 (2024-01-15)

- ✅ 完成三步工作流
- ✅ 支持Helle.ai图片生成
- ✅ 支持微信公众号图片上传
- ✅ 完整的备份和验证机制

## 技术支持

如遇问题,请检查:

1. 环境变量是否正确配置
2. 依赖技能是否已安装
3. 网络连接是否正常
4. API配额是否充足

## 许可证

MIT License
