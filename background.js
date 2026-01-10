// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'sendToTelegram',
    title: '发送到 Telegram',
    contexts: ['link', 'selection', 'page']
  });
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== 'sendToTelegram') return;

  if (info.linkUrl) {
    // 右键点击链接
    sendToTelegram(info.linkUrl);
  } else if (info.selectionText) {
    // 选中文本，发送内容 + 当前页面 Source
    sendToTelegram(info.selectionText, tab.url);
  } else if (tab.url) {
    // 点击页面，发送当前标签
    sendPageToTelegram(tab.id);
  }
});

// 发送页面（获取标题+URL）
function sendPageToTelegram(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: () => ({
      title: document.title,
      url: location.href
    })
  }, (results) => {
    if (results && results[0]) {
      const { title, url } = results[0].result;
      const markdownLink = `[${escapeMarkdown(title)}](${url})`;
      sendToTelegram(markdownLink);
    }
  });
}

// 转义 markdown 特殊字符
function escapeMarkdown(text) {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
}

// 发送到 Telegram
async function sendToTelegram(text, sourceUrl = null) {
  const { token, chatId } = await new Promise(resolve => {
    chrome.storage.local.get(['token', 'chatId'], r => resolve(r));
  });

  if (!token || !chatId) {
    chrome.runtime.openOptionsPage?.();
    return;
  }

  let fullText = text;
  if (sourceUrl) {
    fullText += `\n\n[Source](${sourceUrl})`;
  }
  fullText += `\n#随手记`;

  await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: fullText,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      })
    }
  );
}
