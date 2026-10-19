// modules/scrollReverser.js — [MEME MỚI] Scroll đảo ngược
// Thỉnh thoảng (ngẫu nhiên) đảo ngược hướng cuộn trong 4 giây.
// User cuộn xuống -> trang đi lên. Cảm giác như chuột bị phản bội.

import { randomInt, chance } from '../utils/random.js';

let reversed = false;
let reversedUntil = 0;

/** Cho scrollHijack biết reverser có đang cướp wheel không, để tránh cuộn gấp đôi */
export function isScrollReversed() {
  return reversed && Date.now() <= reversedUntil;
}

function scheduleNext() {
  // 15–35s nữa sẽ đảo ngược một lần
  const delay = randomInt(15000, 35000);
  setTimeout(() => {
    reversed = true;
    reversedUntil = Date.now() + 4000;
    // Hiện hint nhỏ để user biết là "có chuyện"
    const hint = document.createElement('div');
    hint.textContent = '🌀 Chế độ cuộn ngược: 4s';
    hint.style.cssText =
      'position:fixed;top:40px;left:50%;transform:translateX(-50%);background:#f00;color:#fff;padding:6px 12px;z-index:999999;font-size:13px;';
    document.body.appendChild(hint);
    setTimeout(() => hint.remove(), 4000);

    setTimeout(() => {
      reversed = false;
      scheduleNext();
    }, 4000);
  }, delay);
}

export function init() {
  // Chỉ đảo khi đang ở chế độ ngược + còn trong thời gian hiệu lực
  window.addEventListener(
    'wheel',
    (e) => {
      if (!reversed || Date.now() > reversedUntil) return;
      // Chặn cuộn mặc định, cuộn ngược lại
      e.preventDefault();
      window.scrollBy(0, -e.deltaY);
    },
    { passive: false }
  );

  // 30% cơ hội bật ngay lần đầu để user sớm "cảm nhận"
  if (chance(0.3)) {
    setTimeout(() => {
      reversed = true;
      reversedUntil = Date.now() + 4000;
      setTimeout(() => (reversed = false), 4000);
    }, 8000);
  }
  scheduleNext();
}
