// modules/iosTroll.js — iCloud đầy & Camera "chụp lén" [iOS]
// Dựa trên chiến dịch lừa đảo "iCloud đầy dung lượng" ngoài đời thực.
// - Thông báo giả mạo iOS (blur, bo tròn, font -apple-system)
// - Chấm xanh nhấp nháy ở góc (mô phỏng "camera trước đang bật") — chỉ là div + CSS
// - Tự động biến mất sau 8s. Không dùng alert(). CSS trong css/device.css,
//   không inject <style> động như sườn gốc (để CSS tập trung một chỗ).

let started = false;

export function init() {
  if (started) return;
  started = true;
  if (document.getElementById('ios-icloud-noti')) return;

  const noti = document.createElement('div');
  noti.id = 'ios-icloud-noti';
  noti.className = 'ios-noti';

  const icon = document.createElement('div');
  icon.className = 'ios-noti-icon';
  icon.textContent = '☁️';

  const textWrap = document.createElement('div');
  const title = document.createElement('div');
  title.className = 'ios-noti-title';
  title.textContent = 'iCloud';
  const desc = document.createElement('div');
  desc.className = 'ios-noti-desc';
  desc.textContent = 'Dung lượng lưu trữ đã đầy. Không thể sao lưu.';
  textWrap.append(title, desc);
  noti.append(icon, textWrap);
  document.body.appendChild(noti);

  // Chấm xanh "camera đang bật" — chỉ là hiệu ứng CSS, không truy cập camera thật
  const cameraDot = document.createElement('div');
  cameraDot.id = 'ios-camera-dot';
  cameraDot.className = 'ios-camera-dot';
  cameraDot.setAttribute('aria-hidden', 'true');
  cameraDot.title = 'Chấm xanh giả — không có camera nào đang bật cả';
  document.body.appendChild(cameraDot);

  // Tự động biến mất sau 8s
  setTimeout(() => {
    noti.remove();
    cameraDot.remove();
  }, 8000);
}
