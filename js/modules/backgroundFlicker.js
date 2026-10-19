// modules/backgroundFlicker.js — Nền nhấp nháy
// Chu kỳ 1.2s -> dưới ngưỡng 3Hz cho an toàn (vẫn khó chịu nhưng không gây hại).
// Có thể tắt bằng "Giảm chói" — đó là nút duy nhất dùng thật được.

import { el } from '../utils/dom.js';
import { hideAllPopups } from './popupManager.js';
import { beep } from './audio.js';

const COLORS = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00', '#ff0000', '#ffffff', '#000000'];
let colorIndex = 0;
let reduced = false;

export function isReduced() {
  return reduced;
}

export function init() {
  setInterval(() => {
    if (reduced) return;
    colorIndex = (colorIndex + 1) % COLORS.length;
    document.body.style.backgroundColor = COLORS[colorIndex];
  }, 1200);

  // Nút "Giảm chói" — dùng thật được, nên giữ nó tử tế
  const btn = document.querySelector('[data-action="reduce-glare"]');
  if (btn) {
    btn.addEventListener('click', () => {
      reduced = true;
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#eeeeee';
      hideAllPopups();
      beep(440);
      // Đổi text để user biết là đã bật
      btn.textContent = '😎 Đã giảm chói (thật đó)';
    });
  }
}
