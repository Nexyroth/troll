// modules/progressBar.js — Thanh tiến độ thụt lùi + % đã đọc
// Luôn giảm dần, thỉnh thoảng reset về 100% một cách ngẫu nhiên.
// Đây là "tiến độ" theo nghĩa triết học: càng cố càng lùi.

import { randomInt } from '../utils/random.js';
import { el } from '../utils/dom.js';

export function init() {
  let progress = 100;
  setInterval(() => {
    progress -= Math.random() * 3;
    if (progress < 0) progress = 100; // reset ngẫu nhiên kiểu "bắt đầu lại từ đầu"
    const bar = el('thanhTienDo');
    const label = el('chuTienDo');
    if (bar) bar.style.width = progress + '%';
    if (label) label.textContent = 'Đang tải... ' + Math.floor(progress) + '%';
  }, 300);

  // Phần trăm đã đọc — cũng luôn giảm
  let read = 100;
  setInterval(() => {
    read -= randomInt(0, 2);
    if (read < 0) read = 0;
    const node = el('docDuoc');
    if (node) node.textContent = read + '%';
  }, 1200);
}
