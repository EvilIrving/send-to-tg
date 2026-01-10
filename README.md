# Telegram Saver

一键将浏览器中的链接保存到 Telegram 群组或频道。

## 功能

- 点击扩展图标发送当前页面（Markdown 格式超链接）
- 右键菜单发送选中文字或链接
- 自动关闭链接预览
- 配置保存在本地

## 安装

1. Chrome 打开 `chrome://extensions/`
2. 开启右上角 **开发者模式**
3. 点击 **加载已解压的扩展程序**
4. 选择 `telegram-saver` 文件夹

## 配置

1. 首次使用点击扩展图标
2. 填写 Bot Token 和 Chat ID
3. 点击保存

### 获取 Bot Token

1. Telegram 搜索 **@BotFather**（官方机器人）
2. 发送 `/newbot`
3. 按提示输入机器人名称和用户名
4. 复制获得的 Token，格式类似：`123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

### 获取 Chat ID

**方法一：@usernamegetid 机器人（推荐）**

1. Telegram 搜索 **@usernamegetid**
2. 把你的机器人拉进频道
3. 发送 `@频道用户名`，机器人会返回 chat_id

**方法二：getUpdates API**

1. 浏览器访问：
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
   把 `<TOKEN>` 换成你的 Bot Token

2. 返回的 JSON 中找到 `chat` → `id`，格式类似：`-100123456789`

**方法三：直接用 @username**

公开频道/群组可直接填 `@频道名`，无需获取 ID

## 使用

- **发送当前页面**：点击扩展图标 → 确认发送
- **发送选中文字**：右键 → 发送到 Telegram
- **发送链接**：右键链接 → 发送到 Telegram
- **修改配置**：点击扩展图标 → 修改配置

## 消息格式

发送的超链接格式：`[文章标题](https://example.com)`

## 卸载

在 `chrome://extensions/` 中移除扩展即可



1679794310:AAGUlhjKvQZ9qcyICQsWe_VNdOYKQyXivF8


-1001912953325