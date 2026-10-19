// modules/osDetector.js — Trạm kiểm soát hệ điều hành (Phase 4)
// Không troll, chỉ "điều tra" xem user đang dùng gì, dựa trên navigator.userAgent.
// Kết quả được trollOrchestrator dùng để chọn kịch bản theo OS.

export function getOS() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  if (/windows phone/i.test(ua)) return 'Windows Phone';
  if (/win/i.test(ua)) return 'Windows';
  if (/android/i.test(ua)) return 'Android';
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'iOS';
  if (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /Macintosh/.test(ua)) return 'iOS';
  return 'Unknown';
}
