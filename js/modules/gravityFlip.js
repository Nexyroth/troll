// modules/gravityFlip.js
// Trang tự lật ngược + nghiêng dần.
// - Nghiêng dần 0.05°/giây (từ frustrated.io) để user không nhận ra ngay
// - Sau thời gian ngẫu nhiên (25-50s) HOẶC sau 25 lần click, body rotate(180deg) vài giây rồi trở lại

import { randomInt } from '../utils/random.js';

let tilt = 0;
let flipping = false;
let clickCount = 0;

function applyTilt() {
  if (flipping) return;
  document.body.style.transform = `rotate(${tilt}deg)`;
  document.body.style.transformOrigin = 'center center';
}

function doFlip() {
  if (flipping) return;
  flipping = true;
  document.body.classList.add('gravity-flipping');
  document.body.style.transform = 'rotate(180deg)';
  setTimeout(() => {
    document.body.style.transform = `rotate(${tilt}deg)`;
    setTimeout(() => {
      flipping = false;
      document.body.classList.remove('gravity-flipping');
    }, 800);
  }, 3000);
  // Lên lịch lần lật tiếp theo
  setTimeout(doFlip, randomInt(40000, 70000));
}

export function init() {
  // Nghiêng dần: mỗi giây +0.05°, rất khó nhận ra
  setInterval(() => {
    tilt += 0.05;
    // Giữ tilt trong khoảng nhỏ để không lộ quá sớm, reset khi quá 3°
    if (tilt > 3) tilt = 0;
    applyTilt();
  }, 1000);

  // Lật sau N lần click
  document.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 25) {
      clickCount = 0;
      doFlip();
    }
  });

  // Lật lần đầu sau 25-50s
  setTimeout(doFlip, randomInt(25000, 50000));
}
