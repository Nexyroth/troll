// modules/chaserBox.js — Hộp "Đừng đọc dòng này" chạy trốn khỏi con trỏ
// Nếu con trỏ lại gần trong 150px, hộp chạy ngược hướng 45px.

import { el } from '../utils/dom.js';

export function init() {
  const chaser = el('chaser');
  if (!chaser) return;

  document.addEventListener(
    'mousemove',
    (e) => {
      const r = chaser.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150 && dist > 0.01) {
        let nl = r.left + (dx / dist) * 45;
        let nt = r.top + (dy / dist) * 45;
        nl = Math.max(0, Math.min(window.innerWidth - r.width, nl));
        nt = Math.max(0, Math.min(window.innerHeight - r.height, nt));
        chaser.style.left = nl + 'px';
        chaser.style.top = nt + 'px';
      }
    },
    { passive: true }
  );
}
