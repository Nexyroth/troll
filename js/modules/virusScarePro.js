// js/modules/virusScarePro.js — Virus Scare Pro (Phase 7)
// Bản nâng cấp của màn hình virus: overlay toàn màn hình theo OS,
// với hình virus do Mèo vẽ (file PNG trong assets/).
// - PC (Windows/Unknown): virus xanh lá/đỏ gớm gớm nhưng hài hước, nền xanh dương.
// - Android: pin bốc khói + virus cắn màn hình, nền đen xám.
// - iOS: táo cắn dở bị sâu đục + virus đen, nền trắng xám Apple.
//
// Ảnh: assets/virus-pc.png / virus-android.png / virus-ios.png (Mèo vẽ bằng AI).
// Nếu ảnh lỗi (404 / chưa giải nén đủ file), tự fallback sang SVG inline vẽ bằng code.
// Sửa so với sườn gốc:
// - Sườn gốc dùng alert() + overlay.style.cssText + getElementById cho nút.
//   Ở đây dùng toast thay alert, CSS trong css/phase7.css, querySelector trên overlay.
// - Thêm nút ✕ + Esc để thoát, tự đóng sau 10s, khóa + trả lại cuộn trang.
// Hiện sau 30s (do orchestrator hẹn + đợi không còn modal khác).

import { getOS } from './osDetector.js';

let shown = false;

// --- Hình virus vẽ bằng SVG inline (Mèo vẽ) ---
const ART = {
  pc: `
    <svg viewBox="0 0 150 150" width="150" height="150" aria-hidden="true">
      <g stroke="#22c55e" stroke-width="6" stroke-linecap="round">
        <line x1="75" y1="5" x2="75" y2="30"/><line x1="75" y1="120" x2="75" y2="145"/>
        <line x1="5" y1="75" x2="30" y2="75"/><line x1="120" y1="75" x2="145" y2="75"/>
        <line x1="25" y1="25" x2="43" y2="43"/><line x1="107" y1="107" x2="125" y2="125"/>
        <line x1="125" y1="25" x2="107" y2="43"/><line x1="43" y1="107" x2="25" y2="125"/>
      </g>
      <circle cx="75" cy="75" r="45" fill="#16a34a"/>
      <circle cx="60" cy="65" r="8" fill="#fff"/><circle cx="60" cy="65" r="4" fill="#000"/>
      <circle cx="90" cy="65" r="8" fill="#fff"/><circle cx="90" cy="65" r="4" fill="#000"/>
      <path d="M55 95 Q75 110 95 95" stroke="#000" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="40" cy="90" r="6" fill="#ef4444"/><circle cx="110" cy="90" r="6" fill="#ef4444"/>
    </svg>`,
  android: `
    <svg viewBox="0 0 150 150" width="150" height="150" aria-hidden="true">
      <rect x="30" y="20" width="80" height="110" rx="8" fill="#111" stroke="#fff" stroke-width="3"/>
      <rect x="40" y="30" width="60" height="70" fill="#22c55e"/>
      <rect x="40" y="100" width="60" height="20" fill="#ef4444"/>
      <rect x="55" y="12" width="30" height="8" rx="3" fill="#fff"/>
      <path d="M110 30 Q130 10 125 30 Q140 40 120 45" stroke="#999" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="115" cy="115" r="18" fill="#16a34a"/>
      <circle cx="110" cy="112" r="3" fill="#fff"/><circle cx="120" cy="112" r="3" fill="#fff"/>
      <path d="M108 120 Q115 126 122 120" stroke="#000" stroke-width="2" fill="none"/>
    </svg>`,
  ios: `
    <svg viewBox="0 0 150 150" width="150" height="150" aria-hidden="true">
      <path d="M75 30 C60 20 35 25 30 50 C25 80 45 125 75 130 C105 125 125 80 120 50 C115 25 90 20 75 30 Z" fill="#f5f5f5" stroke="#999" stroke-width="2"/>
      <path d="M75 30 C75 20 80 10 90 8" stroke="#8B4513" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M90 8 C100 2 115 5 118 12 C110 15 100 14 90 8 Z" fill="#22c55e"/>
      <circle cx="105" cy="70" r="14" fill="#111"/>
      <circle cx="101" cy="67" r="3" fill="#fff"/><circle cx="109" cy="67" r="3" fill="#fff"/>
      <path d="M100 75 Q105 80 110 75" stroke="#fff" stroke-width="2" fill="none"/>
      <circle cx="55" cy="95" r="10" fill="#ef4444" opacity="0.8"/>
    </svg>`,
};

function showToast(text) {
  const toast = document.createElement('div');
  toast.className = 'phase7-toast';
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

export function init() {
  if (shown) return;
  shown = true;
  if (document.querySelector('.virus-pro-overlay')) return;

  const os = getOS();
  let imgSrc = 'assets/virus-pc.png';
  let art = ART.pc; // Fallback SVG nếu ảnh lỗi
  let title = 'PHÁT HIỆN MÃ ĐỘC!';
  let message = 'Ổ C: của bạn đã bị nhiễm 99 con virus. Dữ liệu đang bị đánh cắp!';
  let btnText = 'QUÉT VIRUS NGAY';

  if (os === 'Android') {
    imgSrc = 'assets/virus-android.png';
    art = ART.android;
    title = 'CẢNH BÁO ANDROID!';
    message = 'Phát hiện 44 con virus trong bộ nhớ. Pin đang quá nhiệt và có thể phát nổ!';
    btnText = 'SỬA LỖI NGAY';
  } else if (os === 'iOS') {
    imgSrc = 'assets/virus-ios.png';
    art = ART.ios;
    title = 'Apple Security Alert';
    message = 'Thiết bị iOS của bạn đã bị hư hại 40.8%. Virus đang mã hóa hình ảnh của bạn.';
    btnText = 'KHÔI PHỤC NGAY';
  }

  const prevOverflow = document.body.style.overflow;
  const overlay = document.createElement('div');
  overlay.className = 'virus-pro-overlay';
  overlay.dataset.os = os;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Cảnh báo virus giả');
  overlay.innerHTML = `
    <button class="virus-pro-close" type="button" aria-label="Đóng">✕</button>
    <div class="virus-pro-art"><img src="${imgSrc}" alt="Virus" class="virus-pro-img"><div class="virus-pro-svg-fallback" hidden>${art}</div></div>
    <h1 class="virus-pro-title">${title}</h1>
    <p class="virus-pro-msg">${message}</p>
    <button class="virus-pro-fix" type="button">${btnText}</button>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden'; // Khóa cuộn khi overlay hiện

  // Nếu ảnh PNG lỗi (chưa giải nén đủ file), fallback sang SVG inline
  const virusImg = overlay.querySelector('.virus-pro-img');
  if (virusImg) {
    virusImg.addEventListener('error', () => {
      virusImg.hidden = true;
      const fallback = overlay.querySelector('.virus-pro-svg-fallback');
      if (fallback) fallback.hidden = false;
    });
  }

  let done = false;
  function close() {
    if (done) return;
    done = true;
    document.removeEventListener('keydown', onEsc);
    overlay.remove();
    document.body.style.overflow = prevOverflow;
  }
  function onEsc(e) {
    if (e.key === 'Escape') close();
  }
  document.addEventListener('keydown', onEsc);

  overlay.addEventListener('click', (e) => {
    if (e.target.closest('.virus-pro-close')) {
      close();
      return;
    }
    if (e.target.closest('.virus-pro-fix')) {
      // Thay alert() bằng toast, rồi đóng sau 1.5s để user kịp đọc
      showToast('Hệ thống đang bảo trì từ năm 2011. Không thể sửa lúc này!');
      setTimeout(close, 1500);
    }
  });

  // Tự động đóng sau 10s
  setTimeout(close, 10000);
}
