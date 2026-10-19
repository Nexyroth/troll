// modules/loginPortal.js
// Input né cursor. Không thể đăng nhập. Đó là chủ ý.
// Lấy cảm hứng từ "The Login Portal That Actively Hates You":
// - Email né cursor trong bán kính ~200px, tốc độ tỉ lệ nghịch với khoảng cách
// - Nếu user "tóm" được (gõ vào email), mật khẩu tự xóa ký tự
// - Trạng thái cuối: field trông như đang bật nhưng thực chất disabled

import { el } from '../utils/dom.js';

const RADIUS = 200;
let fleeCount = 0;
let locked = false;

export function init() {
  const area = el('loginArea');
  const email = el('loginEmail');
  const password = el('loginPassword');
  const btn = el('loginBtn');
  const msg = el('loginMsg');
  if (!area || !email || !password) return;

  // Né cursor: lắng nghe trên container để cả khi input disabled vẫn né được
  area.addEventListener('mousemove', (e) => {
    if (locked) return;
    const rect = email.getBoundingClientRect();
    const areaRect = area.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - e.clientX;
    const dy = cy - e.clientY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < RADIUS && dist > 0.01) {
      fleeCount++;
      // Tốc độ tỉ lệ nghịch với khoảng cách: càng gần càng chạy nhanh
      // dist=200 -> chạy ~15px, dist=10 -> chạy ~95px
      const speed = 15 + ((RADIUS - dist) / RADIUS) * 80;
      const nx = dx / dist;
      const ny = dy / dist;

      // Tính vị trí mới trong tọa độ của #loginArea
      const curLeft = email.offsetLeft + nx * speed;
      const curTop = email.offsetTop + ny * speed;
      const maxLeft = area.clientWidth - email.offsetWidth;
      const maxTop = area.clientHeight - email.offsetHeight;
      email.style.left = Math.max(0, Math.min(maxLeft, curLeft)) + 'px';
      email.style.top = Math.max(0, Math.min(maxTop, curTop)) + 'px';

      if (fleeCount === 3 && msg) msg.textContent = 'Ô email hơi nhút nhát. Thử lại đi.';
      if (fleeCount === 8 && msg) msg.textContent = 'Bạn kiên trì đấy. Nhưng cổng này không muốn bạn vào.';

      // Khóa sau 12 lần né: trông như đang bật nhưng thực chất disabled
      if (fleeCount >= 12 && !locked) {
        locked = true;
        [email, password].forEach((input) => {
          input.disabled = true;
          input.classList.add('fake-enabled'); // giữ vẻ "đang bật"
        });
        if (msg) msg.textContent = 'Đã khóa vì bạn cố gắng quá nhiều. (Thật ra ngay từ đầu đã không đăng nhập được.)';
      }
    }
  }, { passive: true });

  // Nếu tóm được email và gõ: mật khẩu tự xóa ký tự
  email.addEventListener('input', () => {
    if (locked) return;
    if (password.value.length > 0) {
      password.value = password.value.slice(0, -1); // xóa 1 ký tự cuối
      if (msg) msg.textContent = 'Ủa? Mật khẩu vừa mất 1 ký tự. Kỳ lạ nhỉ.';
    }
  });

  if (btn) {
    btn.addEventListener('click', () => {
      if (msg) {
        msg.textContent = locked
          ? 'Không đăng nhập được. Cổng đã khóa.'
          : 'Sai email hoặc mật khẩu. (Thật ra email nào cũng sai.)';
      }
    });
  }
}
