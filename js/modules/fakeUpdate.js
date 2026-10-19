// modules/fakeUpdate.js
// Thông báo cập nhật giả.
// Banner trượt vào từ góc: "Bản cập nhật 2.0 đã sẵn sàng. Khởi động lại để nhận 0 tính năng mới."
// Nút "Khởi động lại" chạy animation chậm 5s rồi location.reload() —
// thực chất không có gì thay đổi, chỉ khiến user tưởng có gì đó đã xảy ra.

import { randomInt } from '../utils/random.js';
import { el } from '../utils/dom.js';

export function init() {
  const banner = el('fakeUpdate');
  const restartBtn = el('fakeUpdateRestart');
  const laterBtn = el('fakeUpdateLater');
  const progress = el('fakeUpdateProgress');
  const bar = el('fakeUpdateProgressBar');
  if (!banner || !restartBtn) return;

  // Hiện lần đầu sau 12-20s
  setTimeout(() => banner.classList.add('show'), randomInt(12000, 20000));

  if (laterBtn) {
    laterBtn.addEventListener('click', () => {
      banner.classList.remove('show');
      // Để sau = hiện lại sau 20s
      setTimeout(() => banner.classList.add('show'), 20000);
    });
  }

  restartBtn.addEventListener('click', () => {
    // Animation chậm 5s để giả vờ đang cập nhật
    if (progress) progress.style.display = 'block';
    restartBtn.textContent = 'Đang cập nhật...';
    restartBtn.disabled = true;

    let pct = 0;
    const timer = setInterval(() => {
      pct += 2; // 5s để đạt 100% (50 tick x 100ms)
      if (bar) bar.style.width = Math.min(100, pct) + '%';
      if (pct >= 100) {
        clearInterval(timer);
        // Thực chất chỉ là reload — không có gì thay đổi cả
        window.location.reload();
      }
    }, 100);
  });
}
