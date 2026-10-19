// modules/popupManager.js — Popup sinh sôi
// Nút "Đóng" tạo thêm 2 popup mới. Nút "Đóng thật" mới đóng thật.
// Popup tự biến mất sau 25s. Có MAX_POPUP để tránh treo trình duyệt.

import { randomInt, randomChoice, chance } from '../utils/random.js';
import { el, createEl, removeEl } from '../utils/dom.js';
import { beep } from './audio.js';

export const MAX_POPUP = 10;
let popupCount = 0;

const MESSAGES = [
  'Chúc mừng! Bạn là người truy cập thứ 1.000.000.',
  'Máy tính của bạn có thể đã bị nhiễm 7 virus. Hoặc không.',
  'Bạn có chắc muốn tiếp tục không?',
  'Thông báo này không có nội dung.',
  'Pin của bạn sắp hết. Chắc vậy.',
  'Có 3 người đang xem trang này. Không ai trong số họ là người thật.',
  'Nhấn OK để nhận 0 đồng.',
  'Đây là thông báo quan trọng. Nội dung đã bị thất lạc.',
  'Bạn đã đăng ký nhận bản tin mà bạn chưa từng đăng ký.',
  'Hệ thống đang bảo trì từ năm 2011.',
  'Vui lòng không tắt trang này. Cứ tắt cũng được.',
  'Bạn còn 1 bước nữa để hoàn tất. Bước đó không tồn tại.',
];

export function getPopupCount() {
  return popupCount;
}

export function closePopupReally(id) {
  const node = el(id);
  if (node) {
    removeEl(node);
    popupCount = Math.max(0, popupCount - 1);
  }
}

/** Ẩn tất cả popup — dùng cho nút "Giảm chói" */
export function hideAllPopups() {
  document.querySelectorAll('.popup').forEach((p) => (p.style.display = 'none'));
  popupCount = 0;
}

export function createPopup() {
  if (popupCount >= MAX_POPUP) return;
  popupCount++;

  const id = 'p' + Math.random().toString(36).slice(2);
  const popup = createEl('div', { className: 'popup', attrs: { id } });

  const W = 300;
  const H = 170;
  popup.style.left = Math.max(0, randomInt(0, Math.max(0, window.innerWidth - W))) + 'px';
  popup.style.top = Math.max(0, randomInt(0, Math.max(0, window.innerHeight - H))) + 'px';

  const title = createEl('div', { className: 'popup-title', text: '⚠ THÔNG BÁO ⚠' });
  const body = createEl('div', { className: 'popup-body', text: randomChoice(MESSAGES) });
  const btns = createEl('div', { className: 'popup-btns' });

  // Nút "Đóng" giả — cố tình sinh thêm 2 popup
  const fakeClose = createEl('button', { text: 'Đóng' });
  fakeClose.addEventListener('click', () => {
    createPopup();
    createPopup();
  });

  // Nút "Đóng thật" — đóng thật, nhưng thỉnh thoảng bị hoán đổi vị trí (meme mới)
  const realClose = createEl('button', { text: 'Đóng thật' });
  realClose.addEventListener('click', () => closePopupReally(id));

  // Meme: 40% cơ hội hoán đổi vị trí 2 nút để user bấm nhầm
  if (chance(0.4)) {
    btns.append(realClose, fakeClose);
  } else {
    btns.append(fakeClose, realClose);
  }

  popup.append(title, body, btns);
  document.body.appendChild(popup);

  // Tự biến mất sau 25s
  setTimeout(() => closePopupReally(id), 25000);
  beep(randomInt(180, 320));
}

export function init() {
  // 2 popup chào sân như bản gốc
  setTimeout(createPopup, 1500);
  setTimeout(createPopup, 4000);

  // Nút "Tạo thêm thông báo" + "Thêm thông báo" (data-action để tránh inline onclick)
  document.querySelectorAll('[data-action="create-popup"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      createPopup();
      createPopup();
    });
  });
  document.querySelectorAll('[data-action="create-one-popup"]').forEach((btn) => {
    btn.addEventListener('click', createPopup);
  });
}
