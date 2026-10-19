// modules/runawayButton.js — Nút chạy trốn
// Hover là nhảy. Có cooldown 200ms để chống kẹt vòng lặp
// (không có cooldown thì nút sẽ nhảy liên tục và trình duyệt khóc).

import { randomInt, randomChoice } from '../utils/random.js';
import { el } from '../utils/dom.js';
import { beep } from './audio.js';
import { createPopup } from './popupManager.js';

let lastJump = 0;
const COOLDOWN_MS = 200;

const CLICK_TEXTS = [
  'Bắt được rồi!',
  'Suýt nữa thì...',
  'Đùa thôi :))',
  'Nhấn lại đi',
  'Không thoát được đâu',
  'Nút này không làm gì cả',
];

export function init() {
  const btn = el('nutTron');
  if (!btn) return;

  btn.addEventListener('mouseover', () => {
    const now = Date.now();
    if (now - lastJump < COOLDOWN_MS) return; // chống kẹt
    lastJump = now;
    btn.style.position = 'fixed';
    btn.style.left = randomInt(0, Math.max(0, window.innerWidth - 200)) + 'px';
    btn.style.top = randomInt(0, Math.max(0, window.innerHeight - 80)) + 'px';
  });

  btn.addEventListener('click', () => {
    beep(880);
    createPopup();
    btn.textContent = randomChoice(CLICK_TEXTS);
  });
}
