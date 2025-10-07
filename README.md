# qbind

基于 Node.js 与 node-napcat-ts 的应用程序，用于将发送特定指令的用户的 QQ 号暂存在对应的 Redis 键中。

`config.json` 内容如下：

```json
{
  "redisUrl": "redis://127.0.0.1:6379",
  "napcatWs": "ws://127.0.0.1:3001",
  "napcatToken": "token",
  "groups": [
    {
      "id": 123456,
      "prefix": "test"
    },
    {
      "id": 123458,
      "prefix": "djh"
    }
  ]
}
```
