// modules/androidTroll.js — Rung lắc & Pin nổ [Android]
// Kết hợp cảnh báo "pin sắp nổ" kiểu scareware + API rung (navigator.vibrate).
// - Popup cảnh báo giả, tự rung nhẹ 200ms khi hiện
// - Đếm ngược 5s rồi tự biến mất (nếu user không bấm gì)
// - Bấm "Đóng" -> rung mạnh hơn [500,200,500,200,500], nút thành "KHÔNG THỂ ĐÓNG!",
//   popup tự biến mất sau 3s
// navigator.vibrate chỉ hoạt động trên một số trình duyệt di động (Chrome Android).
// Nếu không hỗ trợ, bỏ qua an toàn. Không dùng alert(). CSS trong css/device.css.

let started = false;

export function init() {
  if (started) return;
  started = true;
  if (document.getElementById('android-battery-popup')) return;

  const popup = document.createElement('div');
  popup.id = 'android-battery-popup';
  popup.className = 'android-popup';
  popup.setAttribute('role', 'alert');

  const icon = document.createElement('div');
  icon.className = 'android-popup-icon';
  icon.textContent = '🔋⚠️';

  const title = document.createElement('h3');
  title.className = 'android-popup-title';
  title.textContent = 'CẢNH BÁO KHẨN CẤP';

  const desc = document.createElement('p');
  desc.className = 'android-popup-desc';
  desc.innerHTML = 'Pin của bạn đã bị nhiễm virus và đang quá nhiệt!<br>Hệ thống sẽ tự động hủy trong <b id="android-countdown">5</b> giây.';

  const btn = document.createElement('button');
  btn.id = 'android-close-btn';
  btn.className = 'android-close-btn';
  btn.type = 'button';
  btn.textContent = 'Đóng';

  popup.append(icon, title, desc, btn);
  document.body.appendChild(popup);

  // Rung nhẹ khi mới hiện (nếu hỗ trợ)
  if (navigator.vibrate) {
    try { navigator.vibrate(200); } catch (e) { /* kệ */ }
  }

  let gone = false;
  function dismiss() {
    if (gone) return;
    gone = true;
    clearInterval(countdownTimer);
    popup.remove();
  }

  // Đếm ngược 5s -> tự biến mất
  let left = 5;
  const countdownEl = document.getElementById('android-countdown');
  const countdownTimer = setInterval(() => {
    left -= 1;
    if (countdownEl) countdownEl.textContent = String(Math.max(0, left));
    if (left <= 0) dismiss();
  }, 1000);

  btn.addEventListener('click', () => {
    // Troll: bấm đóng thì rung mạnh hơn và đổi text
    if (navigator.vibrate) {
      try { navigator.vibrate([500, 200, 500, 200, 500]); } catch (e) { /* kệ */ }
    }
    btn.textContent = 'KHÔNG THỂ ĐÓNG!';
    btn.classList.add('android-close-btn-stuck');
    btn.disabled = true;
    // Sau 3s tự biến mất
    setTimeout(dismiss, 3000);
  });
}
