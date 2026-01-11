# Telegram Saver

Save links from your browser to Telegram groups or channels with one click.

## Features

- Click the extension icon to send the current page (Markdown format hyperlink)
- Right-click menu to send selected text or links
- Auto-disable link preview
- Configuration saved locally

## Installation

1. Open `chrome://extensions/` in Chrome
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `telegram-saver` folder

## Configuration

1. On first use, click the extension icon
2. Enter Bot Token and Chat ID
3. Click Save

### Getting Bot Token

1. Search for **@BotFather** in Telegram (official bot)
2. Send `/newbot`
3. Follow prompts to enter bot name and username
4. Copy the Token (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Getting Chat ID

**Method 1: @usernamegetid bot (recommended)**

1. Search for **@usernamegetid** in Telegram
2. Add your bot to the channel
3. Send `@channel_username`, the bot will return chat_id

**Method 2: getUpdates API**

1. Visit in browser:

   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```

   Replace `<TOKEN>` with your Bot Token

2. Find `chat` → `id` in the JSON response (format: `-100123456789`)

**Method 3: Use @username directly**

For public channels/groups, you can use `@channel_name` directly, no ID needed

## Usage

- **Send current page**: Click extension icon → Confirm send
- **Send selected text**: Right-click → Send to Telegram
- **Send link**: Right-click link → Send to Telegram
- **Modify config**: Click extension icon → Modify config

## Message Format

Sent hyperlink format: `[Article Title](https://example.com)`

## Uninstallation

Remove the extension from `chrome://extensions/`
