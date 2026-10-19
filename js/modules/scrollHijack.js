// modules/scrollHijack.js — Cướp quyền cuộn (Phase 3)
// Khi đang ở chế độ cướp (burst 6s, mỗi 20-40s một lần):
// - Chặn cuộn mặc định (passive: false để preventDefault hoạt động)
// - 30% xác suất: cuộn giật cục đến vị trí ngẫu nhiên
// - 70% còn lại: cuộn ngược hướng user (cuộn xuống -> trang đi lên)
// Ngoài burst thì để yên cho scrollReverser / cuộn thường hoạt động.
// Nếu scrollReverser đang cướp thì nhường nó — tránh 2 module cuộn gấp đôi.

import { randomInt, chance } from '../utils/random.js';
import { isScrollReversed } from './scrollReverser.js';

let hijacking = false;

function scheduleNext() {
  setTimeout(() => {
    hijacking = true;
    const hint = document.createElement('div');
    hint.textContent = '🚨 Đang cướp quyền cuộn! (6s)';
    hint.style.cssText =
      'position:fixed;top:70px;left:50%;transform:translateX(-50%);background:#f00;color:#fff;padding:6px 12px;z-index:999999;font-size:13px;';
    document.body.appendChild(hint);
    setTimeout(() => hint.remove(), 6000);

    setTimeout(() => {
      hijacking = false;
      scheduleNext();
    }, 6000);
  }, randomInt(20000, 40000));
}

export function init() {
  window.addEventListener(
    'wheel',
    (e) => {
      if (!hijacking) return;
      // Nhường scrollReverser nếu nó đang cướp — tránh cuộn gấp đôi
      if (isScrollReversed()) return;

      e.preventDefault(); // Chặn cuộn mặc định — quan trọng: passive false
      if (chance(0.3)) {
        // 30%: cuộn đến vị trí ngẫu nhiên
        window.scrollTo({
          top: Math.random() * document.body.scrollHeight,
          behavior: 'smooth',
        });
      } else {
        // 70%: cuộn ngược hướng người dùng
        window.scrollBy(0, -e.deltaY);
      }
    },
    { passive: false }
  );

  scheduleNext();
}
