// modules/cookieHell.js — "Địa ngục bánh quy" (Phase 5.2, lấy cảm hứng từ Please Verify)
// 4 lớp popup cookie liên tiếp. Mỗi lớp có tùy chọn vô lý.
// User phải chấp nhận tất cả để tiếp tục, nhưng mỗi lần chấp nhận, lớp mới lại xuất hiện.
// "Từ chối" cũng bị coi là chấp nhận.
// Troll có tâm: nút ✕ mở khóa sau 15s + tự đóng sau 90s. onDone được gọi khi xong / đóng.

const LOP_COOKIE = [
  { ten: 'Cookie thiết yếu', moTa: 'Cần thiết để trang web hoạt động (và để troll bạn).' },
  { ten: 'Cookie phân tích', moTa: 'Chúng tôi theo dõi bạn vì "trải nghiệm tốt hơn".' },
  { ten: 'Void Telemetry', moTa: 'Hư không ghi nhớ. Hư không đồng ý thay bạn.' },
  { ten: 'Final Form Data Collection', moTa: 'Chấp nhận là không thể đảo ngược trên mọi cõi tồn tại.' },
];

let started = false;

export function init(onDone) {
  if (started) return;
  started = true;
  let lopHienTai = 0;
  let done = false;
  let currentPopup = null;

  function finish() {
    if (done) return;
    done = true;
    if (currentPopup) currentPopup.remove();
    if (typeof onDone === 'function') onDone();
  }

  function hienThiLopCookie() {
    if (done) return;
    if (lopHienTai >= LOP_COOKIE.length) {
      const msg = document.createElement('div');
      msg.className = 'cookie-hell-success';
      msg.textContent = '🎉 Bạn đã sống sót qua địa ngục bánh quy! (Lần này thôi)';
      document.body.appendChild(msg);
      setTimeout(() => {
        msg.remove();
        finish();
      }, 5000);
      return;
    }

    const cookie = LOP_COOKIE[lopHienTai];
    const popup = document.createElement('div');
    popup.className = 'cookie-hell-popup';
    popup.innerHTML = `
      <button class="cookie-hell-x" type="button" hidden>✕</button>
      <h3>🍪 Lớp ${lopHienTai + 1}/${LOP_COOKIE.length}: ${cookie.ten}</h3>
      <p>${cookie.moTa}</p>
      <button class="cookie-hell-accept" type="button">Chấp nhận</button>
      <button class="cookie-hell-reject" type="button">Từ chối (không có tác dụng)</button>
    `;
    document.body.appendChild(popup);
    currentPopup = popup;

    // Nút ✕ mở khóa sau 15s — lối thoát
    const xBtn = popup.querySelector('.cookie-hell-x');
    setTimeout(() => {
      if (xBtn && popup.isConnected) xBtn.hidden = false;
    }, 15000);
    xBtn.addEventListener('click', finish);

    function next() {
      popup.remove();
      currentPopup = null;
      lopHienTai++;
      setTimeout(hienThiLopCookie, 1000);
    }

    // Cả Chấp nhận và Từ chối đều đi tiếp — Từ chối cũng là chấp nhận
    popup.querySelector('.cookie-hell-accept').addEventListener('click', next);
    popup.querySelector('.cookie-hell-reject').addEventListener('click', next);
  }

  hienThiLopCookie();

  // Tự đóng sau 90s để không kẹt user mãi
  setTimeout(finish, 90000);
}
