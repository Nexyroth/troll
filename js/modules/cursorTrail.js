// modules/cursorTrail.js — Vệt emoji theo chuột
// Throttle 70ms + { passive: true } để "giả vờ" là tối ưu hiệu năng.
// Thật ra là để trình duyệt không chết khi user quẩy chuột.

import { randomChoice } from '../utils/random.js';

const TRAIL_EMOJIS = ['✨', '💀', '🦄', '🐸', '💩', '🌈', '🍕', '👁'];
let lastTrail = 0;

export function init() {
  document.addEventListener(
    'mousemove',
    (e) => {
      const now = Date.now();
      if (now - lastTrail < 70) return;
      lastTrail = now;

      const span = document.createElement('span');
      span.className = 'trail';
      span.textContent = randomChoice(TRAIL_EMOJIS);
      span.style.left = e.clientX + 'px';
      span.style.top = e.clientY + 'px';
      document.body.appendChild(span);
      setTimeout(() => {
        if (span.parentNode) span.parentNode.removeChild(span);
      }, 900);
    },
    { passive: true }
  );
}
