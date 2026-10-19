// modules/impossibleForm.js — Biểu mẫu bất khả thi (Phase 3: Despair Pack)
// Quy tắc: "Mật khẩu phải dài ít nhất 8 ký tự, không chứa số, không chứa chữ cái,
// và phải có ký tự đặc biệt không có trên bàn phím."
// Tức là: không tồn tại mật khẩu nào thỏa mãn. Đó là chủ ý.
// - Nút "Gửi" đổi màu liên tục (hue-rotate)
// - Bấm Gửi -> luôn lỗi "Hệ thống đang bận, vui lòng thử lại sau 5 giây"
//   Bấm lại vẫn lỗi y hệt. Không bao giờ thành công.
// Không dùng alert() — dùng div lỗi inline để không chặn trình duyệt.

import { el } from '../utils/dom.js';
import { beep } from './audio.js';

const ERRORS = [
  'Hệ thống đang bận, vui lòng thử lại sau 5 giây.',
  'Hệ thống đang bận, vui lòng thử lại sau 5 giây. (Thật đấy, vẫn bận.)',
  'Lỗi: Mật khẩu không hợp lệ. Bạn đã làm hỏng hệ thống.',
  'Mật khẩu phải dài >8, không số, không chữ, có ký tự ngoài bàn phím. Bạn thiếu ít nhất 2 điều.',
  'Hệ thống đang bận, vui lòng thử lại sau 5 giây. Lần này cũng vậy.',
];

let attempt = 0;

export function init() {
  const form = el('impossibleForm');
  const input = el('impossiblePass');
  const btn = el('impossibleBtn');
  const msg = el('impossibleMsg');
  if (!form || !input || !btn) return;

  // Nút đổi màu liên tục — để user biết là nút này "sống"
  let hue = 0;
  setInterval(() => {
    hue = (hue + 30) % 360;
    btn.style.filter = `hue-rotate(${hue}deg)`;
  }, 200);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    attempt++;
    beep(150);
    // Cố tình luôn lỗi dù nhập gì — không hề kiểm tra mật khẩu thật
    if (msg) {
      msg.textContent = ERRORS[Math.min(attempt - 1, ERRORS.length - 1)];
      msg.style.display = 'block';
    }
    // Xóa mật khẩu để user phải gõ lại từ đầu (thêm nỗi đau)
    input.value = '';
    input.placeholder = 'Gõ lại đi... (cũng sai thôi)';
  });

  // Gõ vào ô cũng bị "chê" nhẹ
  input.addEventListener('input', () => {
    if (msg && input.value.length > 0 && input.value.length < 8) {
      msg.textContent = 'Ngắn quá. (Dài hơn cũng sai thôi.)';
      msg.style.display = 'block';
    }
  });
}
