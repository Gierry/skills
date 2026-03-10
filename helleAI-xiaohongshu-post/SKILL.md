---
name: helleAI-xiaohongshu-post
description: 发布小红书笔记。支持发布图文笔记和视频笔记，可自定义标题、内容、话题、图片或视频。用于用户要求发布小红书、发布笔记、发小红书、发布到小红书等场景。
---

# 小红书发布技能

## 接口信息

**地址**: `POST http://0.0.0.0:8080/api/task/execute`

**Headers**: `Content-Type: application/json`

## 发布图文笔记

### 入参

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| plugin_id | string | 是 | 固定值: `xiaohongshu-extension` |
| capability | string | 是 | 固定值: `publish_note` |
| auto_publish | string | 是 | 固定值: `"false"` |
| type | string | 是 | 固定值: `"image"` |
| title | string | 是 | 笔记标题 |
| content | string | 是 | 笔记正文内容 |
| topics | string | 否 | 话题标签，用逗号分隔，如 `"旅行,风景,打卡"` |
| images | string[] | 是 | 图片列表，支持: <br>- URL: `"https://example.com/image1.jpg"`<br>- Base64: `"data:image/jpeg;base64,/9j/4AAQSkZJRg..."` |

### 请求示例

```json
{
  "plugin_id": "xiaohongshu-extension",
  "capability": "publish_note",
  "parameters": {
    "auto_publish": "false",
    "type": "image",
    "title": "我的旅行日记",
    "content": "今天去了一个很美的地方，分享给大家~",
    "topics": "旅行,风景,打卡",
    "images": [
      "https://example.com/image1.jpg",
      "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
    ]
  }
}
```

## 发布视频笔记

### 入参

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| plugin_id | string | 是 | 固定值: `xiaohongshu-extension` |
| capability | string | yes | 固定值: `publish_note` |
| auto_publish | string | 是 | 固定值: `"false"` |
| type | string | 是 | 固定值: `"video"` |
| title | string | 是 | 笔记标题 |
| content | string | 是 | 笔记正文内容 |
| topics | string | 否 | 话题标签，用逗号分隔 |
| videos | string[] | 是 | 视频列表，支持URL或Base64 |

### 请求示例

```json
{
  "plugin_id": "xiaohongshu-extension",
  "capability": "publish_note",
  "parameters": {
    "auto_publish": "false",
    "type": "video",
    "title": "美食制作教程",
    "content": "教大家做一道简单的家常菜",
    "topics": "美食,教程,家常菜",
    "videos": [
      "https://example.com/video1.mp4"
    ]
  }
}
```

## 出参

### 成功响应

```json
{
  "success": true,
  "data": {
    "task_id": "task-uuid",
    "plugin_id": "xiaohongshu-extension",
    "capability": "publish_note",
    "status": "completed",
    "result": {},
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-01T12:00:05Z"
  }
}
```

### 失败响应

```json
{
  "success": false,
  "error": {
    "code": 500,
    "message": "任务执行失败",
    "details": "具体错误信息"
  }
}
```

## 执行方式

使用 `exec` 工具执行 curl 命令:

```bash
curl -X POST http://0.0.0.0:8080/api/task/execute \
  -H "Content-Type: application/json" \
  -d '{
    "plugin_id": "xiaohongshu-extension",
    "capability": "publish_note",
    "parameters": {
      "auto_publish": "false",
      "type": "image",
      "title": "标题",
      "content": "正文",
      "topics": "话题1,话题2",
      "images": ["图片URL或Base64"]
    }
  }'
```

## 注意事项

1. **auto_publish 必须是字符串 "false"**，不是布尔值 false
2. **images/videos 支持两种格式**:
   - URL: `"https://example.com/image.jpg"`
   - Base64: `"data:image/jpeg;base64,/9j/4AAQSkZJRg..."`
3. **topics 用逗号分隔**，会自动添加 # 话题标签
4. 如果接口返回错误，提取 `error.message` 和 `error.details` 反馈给用户
