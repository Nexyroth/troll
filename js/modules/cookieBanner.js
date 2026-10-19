// modules/cookieBanner.js — Cookie banner bất tử
// Bấm "Chấp nhận" -> đóng rồi tự mở lại sau 6s.
// Bấm "từ chối" -> hiện "Không thể từ chối" rồi sau 2s tự thành "Chấp nhận" (đóng).
//
// Phase 7 fix: trước đây rejectCookie() dùng banner.innerHTML = '...' —
// nó XÓA SẠCH các nút trong banner. Khi banner mở lại sau 6s, nó chỉ còn
// dòng chữ, không còn nút nào để bấm. Ở đây thay bằng 1 thẻ thông báo riêng
// (#cookie-reject-msg) gắn thêm vào banner, nút vẫn còn nguyên.

import { el } from '../utils/dom.js';

let rejecting = false;

function closeCookie() {
  const banner = el('cookie');
  if (!banner) return;
  // Dọn thông báo từ chối (nếu có) trước khi ẩn, để lần mở lại sạch
  const msg = document.getElementById('cookie-reject-msg');
  if (msg) msg.remove();
  rejecting = false;
  banner.style.display = 'none';
  // Bất tử: đóng rồi tự mở lại sau 6 giây
  setTimeout(() => {
    banner.style.display = 'block';
  }, 6000);
}

function rejectCookie() {
  const banner = el('cookie');
  if (!banner || rejecting) return;
  rejecting = true;
  // Chỉ thêm thông báo, KHÔNG phá nút
  const msg = document.createElement('div');
  msg.id = 'cookie-reject-msg';
  msg.innerHTML = 'Không thể từ chối. <b>Đã chấp nhận thay bạn.</b>';
  banner.appendChild(msg);
  // Sau 2s tự động chuyển thành "Chấp nhận" (đóng banner)
  setTimeout(closeCookie, 2000);
}

export function init() {
  document.querySelectorAll('[data-action="accept-cookie"]').forEach((btn) => {
    btn.addEventListener('click', closeCookie);
  });
  const rejectBtn = document.querySelector('[data-action="reject-cookie"]');
  if (rejectBtn) rejectBtn.addEventListener('click', rejectCookie);
}
