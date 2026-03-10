---
name: helleAI-x-post-tweet
description: 通过HTTP API发布X(Twitter)推文。支持纯文字推文和带图片的推文，使用用户提供的HTTP接口。当用户要求发推文、发X推文、发布到Twitter、post tweet、发布X时触发。
---

# X Post Tweet Skill

## 接口信息

**接口地址**: POST http://0.0.0.0:8080/api/task/execute
**Content-Type**: application/json

## 入参 (Input Parameters)

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| text | string | 是 | 推文内容，支持emoji |
| images | string[] | 否 | 图片URL或base64编码的图片数据 |
| submit | boolean | 否 | 是否立即发布，默认false（预览模式）|

## 出参 (Output Parameters)

成功响应:
```json
{
  "success": true,
  "data": {
    "task_id": "string",
    "plugin_id": "x-extension",
    "capability": "post_tweet",
    "status": "completed",
    "result": {},
    "created_at": "ISO8601时间",
    "updated_at": "ISO8601时间"
  }
}
```

失败响应:
```json
{
  "success": false,
  "error": {
    "code": number,
    "message": "string",
    "details": "string"
  }
}
```

## 使用示例

### 1. 发送纯文字推文
```json
{
  "plugin_id": "x-extension",
  "capability": "post_tweet",
  "parameters": {
    "text": "Hello from X! 🐦"
  }
}
```

### 2. 发送带图片的推文
```json
{
  "plugin_id": "x-extension",
  "capability": "post_tweet",
  "parameters": {
    "text": "这是一条带图片的推文 🖼️",
    "images": ["https://example.com/image1.jpg"],
    "submit": true
  }
}
```

### 3. 使用base64图片
```json
{
  "plugin_id": "x-extension",
  "capability": "post_tweet",
  "parameters": {
    "text": "Hello with base64 image",
    "images": ["data:image/jpeg;base64,/9j/4AAQSkZJRg..."],
    "submit": true
  }
}
```

## 执行流程

1. 构建HTTP请求JSON body
2. 调用 POST http://0.0.0.0:8080/api/task/execute
3. 解析响应结果
4. 返回成功/失败信息给用户

## 注意事项

- `submit=false` 时为预览模式，不会实际发布
- `submit=true` 或省略时为发布模式
- 图片支持URL和base64两种格式
- 推文内容最大长度受X平台限制
