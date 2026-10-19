// modules/wasteScore.js — [MEME MỚI] Điểm lãng phí thời gian
// Tăng mỗi khi user click hoặc di chuột (throttle để không spam).
// Hiển thị ở góc trên phải. Càng ở lâu, điểm càng cao, càng "thành tựu".

import { el } from '../utils/dom.js';

let score = 0;
let lastMouseScore = 0;

function render() {
  const node = el('wasteScore');
  if (node) node.textContent = `⏱ Điểm lãng phí: ${score}`;
}

export function init() {
  render();

  document.addEventListener('click', () => {
    score += 10;
    render();
  });

  document.addEventListener(
    'mousemove',
    () => {
      const now = Date.now();
      if (now - lastMouseScore < 500) return;
      lastMouseScore = now;
      score += 1;
      render();
    },
    { passive: true }
  );

  // Thưởng "kiên nhẫn": +5 mỗi 10 giây ở lại trang
  setInterval(() => {
    score += 5;
    render();
  }, 10000);
}
