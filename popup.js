const statusEl = document.getElementById('status');
const configPanel = document.getElementById('configPanel');
const sendPanel = document.getElementById('sendPanel');
const messageEl = document.getElementById('message');
let currentTab = null;

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  currentTab = tab;

  chrome.storage.local.get(['token', 'chatId'], (res) => {
    if (res.token && res.chatId) {
      showSendPanel();
    } else {
      showConfigPanel();
    }
  });
}

function showConfigPanel() {
  configPanel.style.display = 'block';
  sendPanel.style.display = 'none';
}

function showSendPanel() {
  configPanel.style.display = 'none';
  sendPanel.style.display = 'block';

  // 生成 markdown 格式链接 [标题](URL)
  const markdownLink = `[${processTitle(currentTab.title)}](${currentTab.url})`;
  messageEl.value = markdownLink;
}

// 处理标题：清理特殊字符 + 转义 Markdown
function processTitle(text) {
  return text
    // 清理特殊符号
    .replace(/[│┃┋‖丨￢￤﹣－—―…"''『』「」•·\\\/]+/g, '')
    // 转义 Markdown 特殊字符
    .replace(/([_*\[\]()~`>#+=|{}.!])/g, '\\$1')
    // 规范化
    .replace(/[|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// 保存配置
document.getElementById('saveConfig').addEventListener('click', () => {
  const token = document.getElementById('token').value.trim();
  const chatId = document.getElementById('chatId').value.trim();

  if (!token || !chatId) {
    showStatus('请填写完整', 'error');
    return;
  }

  chrome.storage.local.set({ token, chatId }, () => {
    showStatus('配置已保存', 'success');
    setTimeout(() => {
      showSendPanel();
    }, 500);
  });
});

// 发送消息
document.getElementById('sendBtn').addEventListener('click', async () => {
  const text = messageEl.value.trim();
  if (!text) return;

  showStatus('发送中...', '');

  try {
    await sendToTelegram(text);
    showStatus('已发送 ✓', 'success');
    setTimeout(() => window.close(), 800);
  } catch (e) {
    if (e.message.includes('未配置')) {
      chrome.runtime.openOptionsPage?.();
    } else {
      showStatus('发送失败', 'error');
    }
  }
});

// 发送到 Telegram
async function sendToTelegram(text) {
  const { token, chatId } = await new Promise(resolve => {
    chrome.storage.local.get(['token', 'chatId'], r => resolve(r));
  });

  if (!token || !chatId) {
    throw new Error('未配置');
  }

  await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `${text}\n#随手记`,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      })
    }
  );
}

// 修改配置
document.getElementById('editConfig').addEventListener('click', () => {
  chrome.storage.local.clear(() => {
    showConfigPanel();
  });
});

function showStatus(msg, type) {
  statusEl.textContent = msg;
  statusEl.className = type;
}

init();
