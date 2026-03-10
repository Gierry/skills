---
name: helleAI-douyin-publish
description: 通过HTTP API发布抖音图文。支持图片+文字+话题的图文发布，使用用户提供的HTTP接口。当用户要求发抖音、发布抖音图文、post douyin、发布到抖音时触发。
---

# Douyin Publish Skill

## 接口信息

**接口地址**: POST http://0.0.0.0:8080/api/task/execute
**Content-Type**: application/json

## 入参 (Input Parameters)

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 图文标题 |
| description | string | 是 | 图文简介/正文内容 |
| images | string[] | 是 | 图片URL列表，支持多张图片 |
| topics | string[] | 否 | 话题列表，最多支持多个话题 |

## 出参 (Output Parameters)

成功响应:
```json
{
  "success": true,
  "data": {
    "task_id": "string",
    "plugin_id": "douyin-extension",
    "capability": "publish_image",
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

### 1. 发布基础图文
```json
{
  "plugin_id": "douyin-extension",
  "capability": "publish_image",
  "parameters": {
    "title": "我的第一个图文",
    "description": "这是图文简介",
    "images": [
      "https://example.com/image1.jpg"
    ]
  }
}
```

### 2. 发布多图带话题
```json
{
  "plugin_id": "douyin-extension",
  "capability": "publish_image",
  "parameters": {
    "title": "美食分享",
    "description": "今天吃了好吃的美食，太满足了！",
    "images": [
      "https://example.com/food1.jpg",
      "https://example.com/food2.jpg",
      "https://example.com/food3.jpg"
    ],
    "topics": ["美食", "生活记录", "日常分享"]
  }
}
```

## 执行流程

1. 构建HTTP请求JSON body
2. 调用 POST http://0.0.0.0:8080/api/task/execute
3. 解析响应结果
4. 返回成功/失败信息给用户

## 注意事项

- 图片支持多个URL
- 话题为可选参数
- title和description为必填项
- 接口地址为本地地址，如部署在其他机器请修改
