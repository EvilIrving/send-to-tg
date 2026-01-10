document.getElementById('save').addEventListener('click', () => {
  const token = document.getElementById('token').value.trim();
  const chatId = document.getElementById('chatId').value.trim();

  if (!token || !chatId) {
    showStatus('请填写完整', 'error');
    return;
  }

  chrome.storage.local.set({ token, chatId }, () => {
    showStatus('已保存 ✓', 'success');
  });
});

function showStatus(msg, type) {
  const el = document.getElementById('status');
  el.textContent = msg;
  el.className = type;
}

// 加载已有配置
chrome.storage.local.get(['token', 'chatId'], r => {
  if (r.token) document.getElementById('token').value = r.token;
  if (r.chatId) document.getElementById('chatId').value = r.chatId;
});
