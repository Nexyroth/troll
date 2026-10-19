// modules/titleFlicker.js — Tiêu đề tab nhảy loạn
// Đổi document.title mỗi 2 giây để user tưởng có tin nhắn mới.

import { randomChoice } from '../utils/random.js';

const TITLES = [
  'Trang web rất bình thường',
  '(3) Tin nhắn mới',
  'ĐỪNG TẮT TRANG',
  'loading...',
  'Chào bạn!',
  'document.title',
];

export function init() {
  setInterval(() => {
    document.title = randomChoice(TITLES);
  }, 2000);
}
