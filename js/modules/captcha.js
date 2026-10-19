// modules/captcha.js — Captcha bất khả thi
// Chọn đúng bao nhiêu cũng báo sai. Cố tình trả về false.
// Đây là bài kiểm tra "bạn có phải người không" — đáp án luôn là "không".

import { randomChoice } from '../utils/random.js';
import { el } from '../utils/dom.js';
import { beep } from './audio.js';

const EMOJIS = ['🚌', '🍔', '🚌', '🐱', '🚌', '🍔', '🚌', '🐱', '🚌'];

const WRONG_MESSAGES = [
  'Sai rồi. Thử lại.',
  'Sai. Có vẻ bạn là robot.',
  'Gần đúng. Nhưng sai.',
  'Lỗi hệ thống. Thử lại sau.',
];

export function init() {
  const container = el('captcha');
  const result = el('ketQuaCaptcha');
  const verifyBtn = document.querySelector('[data-action="verify-captcha"]');
  if (!container) return;

  EMOJIS.forEach((emoji) => {
    const cell = document.createElement('div');
    cell.textContent = emoji;
    cell.addEventListener('click', function () {
      this.classList.toggle('chon');
      beep(600);
    });
    container.appendChild(cell);
  });

  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      // Cố tình luôn sai — không hề kiểm tra lựa chọn thật
      if (result) result.textContent = randomChoice(WRONG_MESSAGES);
      beep(150);
    });
  }
}
