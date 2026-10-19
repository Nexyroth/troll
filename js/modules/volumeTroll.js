// js/modules/volumeTroll.js — "Âm lượng của bạn quá nhỏ!" (Phase 7)
// Popup góc màn hình: "Âm lượng thiết bị đang ở mức 1%. Bấm để sửa!"
// Khi bấm, nó KHÔNG sửa gì cả — nó phát troll.mp3 ở âm lượng TỐI ĐA (100%).
//
// Sửa so với sườn gốc:
// - Sườn gốc dùng alert() khi play() fail -> vi phạm quy tắc "không alert()".
//   Ở đây dùng toast (div .phase7-toast).
// - Sườn gốc tạo new Audio('assets/troll.mp3') mới — nếu Phase 5 đã phát,
//   2 audio cùng phát sẽ thành echo. Ở đây tái sử dụng #troll-audio nếu có,
//   set volume = 1.0 rồi play; chưa có thì tạo mới bằng import.meta.url.
// - Thêm nút ✕ + Esc để đóng (troll có tâm), tự đóng sau 15s.
// CSS trong css/phase7.css, không inline cssText. Hiện sau 18s (do orchestrator hẹn).

let shown = false;

function showToast(text) {
  const toast = document.createElement('div');
  toast.className = 'phase7-toast';
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function playAtMaxVolume() {
  // Tái sử dụng audio Phase 5 nếu có, tránh 2 audio cùng phát
  let audio = document.getElementById('troll-audio') || document.getElementById('music-prompt-audio');
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'volume-troll-audio';
    audio.src = new URL('../../assets/troll.mp3', import.meta.url).href;
    audio.loop = true;
    audio.preload = 'auto';
    document.body.appendChild(audio);
  }
  audio.volume = 1.0; // Max volume!
  audio.play().catch(() => {
    showToast('Hãy bấm vào trang trước để bật âm thanh!');
  });
}

export function init() {
  if (shown) return;
  shown = true;
  if (document.getElementById('volume-troll-popup')) return;

  const popup = document.createElement('div');
  popup.id = 'volume-troll-popup';
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-label', 'Cảnh báo âm lượng giả');
  popup.innerHTML = `
    <button class="volume-troll-close" type="button" aria-label="Đóng">✕</button>
    <div class="volume-troll-row">
      <span class="volume-troll-icon">🔇</span>
      <div>
        <p class="volume-troll-title">Âm lượng quá nhỏ!</p>
        <p class="volume-troll-desc">Thiết bị của bạn đang ở mức 1%.</p>
      </div>
    </div>
    <button class="volume-troll-fix" type="button">BẤM ĐỂ SỬA NGAY</button>
  `;
  document.body.appendChild(popup);

  let done = false;
  function close() {
    if (done) return;
    done = true;
    document.removeEventListener('keydown', onEsc);
    popup.remove();
  }
  function onEsc(e) {
    if (e.key === 'Escape') close();
  }
  document.addEventListener('keydown', onEsc);

  popup.addEventListener('click', (e) => {
    if (e.target.closest('.volume-troll-close')) {
      close(); // ✕ = đóng, không phát nhạc
      return;
    }
    // Bấm bất cứ chỗ nào còn lại = "sửa" = phát nhạc ở 100%
    close();
    playAtMaxVolume();
    showToast('Đã sửa âm lượng! (Lên 100% 🔊)');
  });

  // Tự động mất sau 15s
  setTimeout(close, 15000);
}
