// modules/windowsTroll.js — Màn hình cập nhật Windows 11 "bất tử" [Windows]
// Lấy cảm hứng từ FakeUpdate / FakeBSOD:
// - Overlay toàn màn hình y như thật, nền #0078d7, "Đừng tắt PC"
// - Thanh tiến trình chạy đến 99% rồi tụt về số ngẫu nhiên thấp hơn, không bao giờ 100%
// Troll có tâm: không khóa cứng user.
// - Sau 10s mới mở khóa Esc + hiện nút Thoát (để user có cách thoát)
// - Tự động biến mất sau 60s dù user không làm gì
// Không dùng alert(). CSS nằm trong css/device.css, không inline cssText.

import { el } from '../utils/dom.js';

let started = false;

export function init() {
  if (started) return; // chống init 2 lần
  started = true;
  if (document.getElementById('windows-update-screen')) return;

  const overlay = document.createElement('div');
  overlay.id = 'windows-update-screen';
  overlay.className = 'win-update-screen';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Cập nhật Windows giả');

  const icon = document.createElement('div');
  icon.className = 'win-update-icon';
  icon.textContent = '⚙️';

  const title = document.createElement('h1');
  title.className = 'win-update-title';
  title.textContent = 'Đang cập nhật...';

  const subtitle = document.createElement('p');
  subtitle.className = 'win-update-subtitle';
  subtitle.textContent = 'Đừng tắt PC của bạn. Việc này sẽ mất một lúc.';

  const track = document.createElement('div');
  track.className = 'win-progress-track';
  const bar = document.createElement('div');
  bar.id = 'win-progress-bar';
  bar.className = 'win-progress-bar';
  track.appendChild(bar);

  const percent = document.createElement('p');
  percent.id = 'win-percent';
  percent.className = 'win-percent';
  percent.textContent = '0%';

  const hint = document.createElement('p');
  hint.id = 'win-esc-hint';
  hint.className = 'win-esc-hint';
  hint.textContent = 'Đang cập nhật... (Esc sẽ mở khóa sau 10 giây)';

  const exitBtn = document.createElement('button');
  exitBtn.id = 'win-exit-btn';
  exitBtn.className = 'win-exit-btn';
  exitBtn.type = 'button';
  exitBtn.textContent = 'Thoát cập nhật (Esc)';
  exitBtn.hidden = true;

  const errorCode = document.createElement('p');
  errorCode.className = 'win-error-code';
  errorCode.textContent = 'Mã lỗi: 0x000000DEAD';

  overlay.append(icon, title, subtitle, track, percent, hint, exitBtn, errorCode);
  document.body.appendChild(overlay);

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 5;
    if (progress > 99) {
      // Troll: tụt về số ngẫu nhiên thấp hơn, không bao giờ đạt 100%
      progress = Math.random() * 30;
    }
    bar.style.width = progress + '%';
    percent.textContent = Math.floor(progress) + '%';
  }, 800);

  let canExit = false;
  function cleanup() {
    clearInterval(interval);
    clearTimeout(autoTimeout);
    document.removeEventListener('keydown', onKey);
    overlay.remove();
  }

  function onKey(e) {
    if (e.key === 'Escape' && canExit) cleanup();
  }

  // Mở khóa Esc sau 10s (đúng spec) + hiện nút thoát + cập nhật hint
  setTimeout(() => {
    canExit = true;
    hint.textContent = 'Đã cập nhật 10 giây. Nhấn Esc hoặc nút dưới để thoát.';
    exitBtn.hidden = false;
    document.addEventListener('keydown', onKey);
  }, 10000);

  exitBtn.addEventListener('click', () => {
    if (canExit) cleanup();
  });

  // An toàn: tự biến mất sau 60s dù user không biết Esc
  const autoTimeout = setTimeout(cleanup, 60000);

  // Dùng el() để không bị lint "unused" — kiểm tra overlay đã gắn
  void el('windows-update-screen');
}
