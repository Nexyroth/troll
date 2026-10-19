// modules/cancelConfirmSwap.js
// Nút "Hủy" xác nhận hành động. Label đúng, hành vi ngược.
// Đây là cú troll tâm lý mạnh nhất trong danh sách.
// Dựa trên Cancel = Confirm: dialog xóa tài khoản giả, nhưng
// - Bấm "Hủy" -> THỰC HIỆN xóa (giả)
// - Bấm "Xóa" -> hủy bỏ, đóng dialog như không có gì

import { el } from '../utils/dom.js';

export function init() {
  const overlay = el('deleteDialogOverlay');
  const cancelBtn = el('deleteCancelBtn');
  const confirmBtn = el('deleteConfirmBtn');
  const result = el('deleteResult');
  if (!overlay || !cancelBtn || !confirmBtn) return;

  const openBtn = document.querySelector('[data-action="open-delete-dialog"]');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      overlay.classList.add('show');
      if (result) result.textContent = '';
    });
  }

  // CỐ TÌNH NGƯỢC: nút Hủy thực hiện xóa
  cancelBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
    if (result) {
      result.textContent = '💀 Tài khoản đã bị xóa vì bạn đã bấm "Hủy". Logic 10/10. Đang đăng xuất...';
    }
    // Giả vờ đăng xuất: sau 3s "khôi phục" để user không mất trang thật
    setTimeout(() => {
      if (result) result.textContent = 'Đùa thôi, tài khoản vẫn còn. Nhưng bạn đã hoảng sợ 3 giây. Đủ rồi.';
    }, 3000);
  });

  // CỐ TÌNH NGƯỢC: nút Xóa chỉ hủy bỏ
  confirmBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
    if (result) result.textContent = 'Bạn đã bấm "Xóa" và không có gì xảy ra. Thật là anticlimax.';
  });

  // Bấm ra ngoài overlay cũng đóng (hành vi bình thường duy nhất ở đây)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('show');
  });
}
