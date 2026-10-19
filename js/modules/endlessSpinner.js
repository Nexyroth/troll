// modules/endlessSpinner.js — [MEME MỚI] Loading không bao giờ kết thúc
// Spinner ở góc trái dưới quay mãi mãi, % nhảy loạn nhưng không bao giờ 100%.

import { randomInt } from '../utils/random.js';
import { el } from '../utils/dom.js';

export function init() {
  const label = el('spinnerLabel');
  if (!label) return;

  setInterval(() => {
    // Nhảy từ 87% -> 99% -> 12% -> 99%... không bao giờ xong
    const fake = randomInt(0, 99);
    label.textContent = `Đang tải... ${fake}% (sắp xong rồi)`;
  }, 900);
}
