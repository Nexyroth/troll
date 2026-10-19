// modules/iosVirusScare.js — "44 con virus" & Thanh dung lượng giả (Phase 4.1)
// Scareware tinh vi nhắm vào iPhone:
// - Giả mạo giao diện Apple: "Apple Security", "44 con virus", "hư hại 40.8%"
// - Thanh dung lượng giả có mục "🦠 Virus" (chi tiết tạo niềm tin theo các bài báo lừa đảo)
// - Bấm "Xóa virus ngay" -> toast "Đang kết nối với App Store..."
// - Bấm "Để sau" -> toast cảnh báo, bấm 3 lần thì đóng thật
// - Tự đóng sau 25s + nút ✕ mở khóa sau 10s để không trap user
// CSS tách sang css/virus.css, không inline cssText, không dùng alert().

let started = false;

function showToast(text, variant = '') {
  const toast = document.createElement('div');
  toast.className = `virus-toast ${variant}`.trim();
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), variant.includes('top') ? 3000 : 4000);
  return toast;
}

export function init() {
  if (started) return;
  started = true;
  if (document.getElementById('ios-virus-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'ios-virus-overlay';
  overlay.className = 'ios-virus-overlay';
  overlay.setAttribute('role', 'alertdialog');
  overlay.innerHTML = `
    <div class="ios-virus-dialog">
      <button id="ios-virus-x" class="ios-virus-x" type="button" hidden>✕</button>
      <div class="ios-virus-logo"></div>
      <h2 class="ios-virus-title">Apple Security</h2>
      <p class="ios-virus-subtitle">Cảnh báo hệ thống</p>
      <div class="ios-virus-warning">
        <p><b>⚠️ Thiết bị của bạn đã bị hư hại nghiêm trọng</b></p>
        <p>iPhone của bạn bị nhiễm <b>44 con virus</b> và đang bị hư hại <b>40.8%</b>. Dữ liệu, ảnh và danh bạ có thể bị mất.</p>
      </div>
      <div class="ios-storage">
        <div class="ios-storage-head"><span>Dung lượng</span><span>231 GB / 256 GB</span></div>
        <div class="ios-storage-bar">
          <div class="seg-photos"></div>
          <div class="seg-apps"></div>
          <div class="seg-ios"></div>
          <div class="seg-virus"></div>
          <div class="seg-other"></div>
        </div>
        <div class="ios-storage-legend">
          <span>📷 Ảnh</span><span>📱 Ứng dụng</span><span>⚙️ iOS</span><span class="virus">🦠 Virus</span>
        </div>
      </div>
      <button id="ios-virus-remove-btn" class="ios-virus-remove-btn" type="button">Xóa virus ngay</button>
      <button id="ios-virus-later-btn" class="ios-virus-later-btn" type="button">Để sau</button>
    </div>
  `;
  document.body.appendChild(overlay);

  let gone = false;
  function cleanup() {
    if (gone) return;
    gone = true;
    clearTimeout(autoTimeout);
    overlay.remove();
  }

  const xBtn = document.getElementById('ios-virus-x');
  setTimeout(() => {
    if (xBtn) xBtn.hidden = false;
  }, 10000);
  if (xBtn) xBtn.addEventListener('click', cleanup);

  document.getElementById('ios-virus-remove-btn').addEventListener('click', () => {
    showToast('🔄 Đang kết nối với App Store... Vui lòng đợi.', 'virus-toast--pill');
  });

  let laterCount = 0;
  document.getElementById('ios-virus-later-btn').addEventListener('click', () => {
    laterCount++;
    if (laterCount >= 3) {
      cleanup();
      return;
    }
    showToast('⚠️ Bạn nên xử lý ngay để tránh mất dữ liệu! (Bấm thêm ' + (3 - laterCount) + ' lần nữa để đóng.)', 'virus-toast--top');
  });

  // Tự động đóng sau 25s
  const autoTimeout = setTimeout(cleanup, 25000);
}
