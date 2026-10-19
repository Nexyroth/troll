// modules/androidVirusScare.js — "79 con virus" & Màn hình nhấp nháy (Phase 4.1)
// Mô phỏng scareware nhắm vào Android:
// - Popup "PHÁT HIỆN VIRUS! 79 con virus", thanh quét giả không bao giờ 100%
// - Overlay nhấp nháy đỏ mờ để tạo cảm giác hệ thống bất ổn
// - Bấm "SỬA NGAY" -> toast "Không thể kết nối đến máy chủ"
// - Bấm "Để sau" -> toast "Bạn không thể bỏ qua...", bấm 3 lần thì đóng thật
// Sửa so với sườn gốc (troll có tâm):
// - KHÔNG dùng alert() — dùng toast div, đúng quy tắc Phase 4
// - Flicker chậm xuống 0.35s alternate (~1.4Hz, dưới 3Hz) thay vì 0.15s (~3.3Hz)
// - CSS tách sang css/virus.css, không inject <style> động, không inline cssText
// - Thêm nút ✕ hiện sau 10s + tự đóng sau 30s để không trap user

let started = false;

function showToast(text, variant = '') {
  const toast = document.createElement('div');
  toast.className = `virus-toast virus-toast--bottom ${variant}`.trim();
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
  return toast;
}

export function init() {
  if (started) return;
  started = true;
  if (document.getElementById('android-virus-popup')) return;

  // 1. Overlay nhấp nháy (pointer-events: none, opacity thấp)
  const flicker = document.createElement('div');
  flicker.className = 'android-flicker-overlay';
  flicker.setAttribute('aria-hidden', 'true');
  document.body.appendChild(flicker);

  // 2. Popup chính — innerHTML chỉ chứa class, không inline style
  const popup = document.createElement('div');
  popup.id = 'android-virus-popup';
  popup.className = 'android-virus-popup';
  popup.setAttribute('role', 'alert');
  popup.innerHTML = `
    <button id="android-virus-x" class="android-virus-x" type="button" hidden>✕</button>
    <div class="android-virus-icon">🛡️⚠️</div>
    <h2 class="android-virus-title">PHÁT HIỆN VIRUS!</h2>
    <p class="android-virus-desc">
      Điện thoại Android của bạn đã bị nhiễm <b>79 con virus</b>!
      <br>Dữ liệu cá nhân của bạn đang gặp nguy hiểm.
    </p>
    <div class="android-virus-track"><div id="android-virus-progress" class="android-virus-bar"></div></div>
    <p class="android-virus-status">Đang quét... <span id="android-virus-percent">0%</span></p>
    <button id="android-virus-fix-btn" class="android-virus-fix-btn" type="button">SỬA NGAY (MIỄN PHÍ)</button>
    <button id="android-virus-close-btn" class="android-virus-close-btn" type="button">Để sau</button>
  `;
  document.body.appendChild(popup);

  let progress = 0;
  let gone = false;
  const bar = document.getElementById('android-virus-progress');
  const percent = document.getElementById('android-virus-percent');
  const interval = setInterval(() => {
    progress += Math.random() * 8;
    if (progress > 95) {
      progress = Math.random() * 30; // tụt ngẫu nhiên, không bao giờ 100%
    }
    if (bar) bar.style.width = progress + '%';
    if (percent) percent.textContent = Math.floor(progress) + '%';
  }, 400);

  function cleanup() {
    if (gone) return;
    gone = true;
    clearInterval(interval);
    clearTimeout(autoTimeout);
    flicker.remove();
    popup.remove();
  }

  // Nút ✕ mở khóa sau 10s — lối thoát rõ ràng
  const xBtn = document.getElementById('android-virus-x');
  setTimeout(() => {
    if (xBtn) xBtn.hidden = false;
  }, 10000);
  if (xBtn) xBtn.addEventListener('click', cleanup);

  // Sửa ngay -> toast lỗi kết nối, không đóng popup
  document.getElementById('android-virus-fix-btn').addEventListener('click', () => {
    showToast('❌ Không thể kết nối đến máy chủ. Vui lòng thử lại sau.', 'virus-toast--error');
  });

  // Để sau -> toast, bấm 3 lần thì đóng thật (không dùng alert)
  let laterCount = 0;
  document.getElementById('android-virus-close-btn').addEventListener('click', () => {
    laterCount++;
    if (laterCount >= 3) {
      cleanup();
      return;
    }
    showToast('Bạn không thể bỏ qua cảnh báo bảo mật quan trọng này! (Bấm thêm ' + (3 - laterCount) + ' lần nữa để đóng.)', 'virus-toast--error');
  });

  // Tự động đóng sau 30s
  const autoTimeout = setTimeout(cleanup, 30000);
}
