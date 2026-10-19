// modules/fakeCrash.js — [MEME MỚI] Fake system crash
// Thỉnh thoảng hiện màn hình xanh giả 2 giây rồi biến mất.
// Không làm gì thật cả — chỉ dọa user.
//
// Phase 7 fix "BSOD mất chữ": khi BSOD hiện, khóa cuộn trang
// (document.body.style.overflow = 'hidden') để overlay fixed không bị
// cảm giác "trôi" theo nội dung cuộn bên dưới. Khi BSOD biến mất, trả lại
// giá trị overflow cũ (lưu trước khi khóa, không hardcode 'auto').
// CSS fixed + !important nằm trong css/components.css, không dùng cssText.

import { randomInt } from '../utils/random.js';
import { el } from '../utils/dom.js';
import { beep } from './audio.js';

export function init() {
  const overlay = el('fakeCrash');
  if (!overlay) return;

  function trigger() {
    const prevOverflow = document.body.style.overflow;
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Khóa cuộn khi BSOD hiện
    beep(120);
    setTimeout(() => {
      overlay.classList.remove('show');
      document.body.style.overflow = prevOverflow; // Trả lại cuộn
      // Lên lịch lần tiếp theo: 25–60s
      setTimeout(trigger, randomInt(25000, 60000));
    }, 2000);
  }

  // Lần đầu sau 20–40s để user kịp "yên tâm" trước khi bị dọa
  setTimeout(trigger, randomInt(20000, 40000));
}
