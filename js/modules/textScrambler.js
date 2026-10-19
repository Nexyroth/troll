// modules/textScrambler.js — Ô nhập tự đảo chữ
// Mỗi lần gõ, hoán đổi 2 ký tự cuối.
// Người dùng gõ "hello" sẽ nhận được "hlelo" — chúng tôi sắp xếp lại cho đẹp.

import { el } from '../utils/dom.js';

export function init() {
  const input = el('oNhap');
  if (!input) return;

  input.addEventListener('input', function () {
    const v = this.value;
    if (v.length > 1) {
      const chars = v.split('');
      const last = chars[chars.length - 1];
      chars[chars.length - 1] = chars[chars.length - 2];
      chars[chars.length - 2] = last;
      this.value = chars.join('');
      // Giữ caret ở cuối để trông như "bình thường"
      this.setSelectionRange(this.value.length, this.value.length);
    }
  });
}
