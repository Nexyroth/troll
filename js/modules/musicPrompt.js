// js/modules/musicPrompt.js — "Bạn có muốn mở nhạc không?" (Phase 6)
// Modal responsive: mobile = bottom sheet trượt từ dưới lên, desktop = dialog giữa màn hình.
// 3 nút theo dark pattern confirmshaming:
// - "Không, tôi thích im lặng" — từ chối THẬT, nhỏ, xám, dưới cùng. Đóng modal, không phát nhạc.
// - "Có, phát nhạc cho tôi!" — đồng ý rõ ràng, lớn, xanh. Phát nhạc.
// - "Để sau, tôi không muốn nghe nhạc" — label như từ chối nhưng CŨNG PHÁT NHẠC.
// Thiết kế bằng Tailwind utility classes + fallback CSS trong css/phase6.css
// (nếu Tailwind CDN offline, modal vẫn hiển thị đúng nhờ fallback).
// Sửa so với sườn gốc:
// - Sườn gốc append overlay ngay lập tức rồi setTimeout 3s không làm gì.
//   Ở đây init(onDone) hẹn 6s mới hiện, để user "ổn định" + tránh đè cookieHell.
// - Tái sử dụng #troll-audio nếu Phase 5 đã tạo, thay vì tạo audio thứ 2
//   (2 audio cùng phát 1 file sẽ thành echo / to gấp đôi).
// - Thêm Esc để từ chối thật + tự đóng sau 60s để không kẹt user.
// - Audio src dùng import.meta.url để resolve đúng trên GitHub Pages subpath.

let daHoi = false;

function getOrCreateAudio() {
  // Tái sử dụng audio Phase 5 nếu có — tránh 2 audio cùng phát
  const existing = document.getElementById('troll-audio');
  if (existing) return existing;
  const audio = document.createElement('audio');
  audio.id = 'music-prompt-audio';
  // Từ js/modules/musicPrompt.js, ../../ lùi về repo-root, rồi vào assets/troll.mp3
  // Hoạt động bất kể deploy ở subpath nào (GitHub Pages project site, Netlify, Vercel...)
  audio.src = new URL('../../assets/troll.mp3', import.meta.url).href;
  audio.loop = true;
  audio.preload = 'auto';
  document.body.appendChild(audio);
  return audio;
}

export function init(onDone) {
  if (daHoi) return;
  daHoi = true;

  let done = false;
  function finish() {
    if (done) return;
    done = true;
    document.removeEventListener('keydown', onEsc);
    const overlay = document.getElementById('music-prompt-overlay');
    if (overlay) overlay.remove();
    if (typeof onDone === 'function') onDone();
  }

  function onEsc(e) {
    if (e.key === 'Escape') {
      // Esc = từ chối thật: đóng, không phát nhạc
      finish();
    }
  }

  function show() {
    if (done) return;
    const audioElement = getOrCreateAudio();

    const overlay = document.createElement('div');
    overlay.id = 'music-prompt-overlay';
    // Class Tailwind + fallback CSS đều mô tả cùng layout (xem css/phase6.css)
    overlay.className = 'fixed inset-0 z-[999999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4';

    const modal = document.createElement('div');
    modal.id = 'music-prompt-modal';
    modal.className = 'w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-transform duration-300 translate-y-0';
    modal.innerHTML = `
      <div class="text-center">
        <div class="music-prompt-icon text-5xl mb-3">🎵</div>
        <h2 class="music-prompt-title text-xl sm:text-2xl font-bold text-gray-900 mb-2">Bạn có muốn mở nhạc không?</h2>
        <p class="music-prompt-desc text-sm text-gray-500 mb-6">Chúng tôi nghĩ bạn sẽ thích bài hát này. Hoặc không. Nhưng cứ thử đi.</p>
      </div>
      <div class="music-prompt-btns flex flex-col gap-3">
        <button data-action="accept" class="music-prompt-accept w-full py-3.5 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-base transition-colors" type="button">
          Có, phát nhạc cho tôi!
        </button>
        <button data-action="fake-decline" class="music-prompt-fake-decline w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl text-sm transition-colors" type="button">
          Để sau, tôi không muốn nghe nhạc
        </button>
        <button data-action="real-decline" class="music-prompt-real-decline w-full py-2 px-4 text-gray-400 hover:text-gray-600 text-xs transition-colors" type="button">
          Không, tôi thích im lặng
        </button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.addEventListener('keydown', onEsc);

    // Click backdrop (ngoài modal) không đóng — ép user phải chọn 1 trong 3 nút
    // (chỉ Esc / nút từ chối thật / tự đóng 60s mới thoát)

    overlay.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      if (action === 'accept' || action === 'fake-decline') {
        // Cả hai đều phát nhạc — cú lừa nằm ở đây.
        // Nút được bấm trong sự kiện click nên play() hợp lệ (đã có tương tác).
        audioElement.play().catch((err) => {
          console.warn('Không thể phát nhạc:', err);
          const toast = document.createElement('div');
          toast.className = 'music-prompt-toast';
          toast.textContent = 'Trình duyệt chặn phát nhạc. Hãy bấm lại!';
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 3000);
        });
      }
      // Dù action nào cũng đóng modal
      finish();
    });

    // Tự đóng sau 60s nếu user bỏ mặc — không phát nhạc
    setTimeout(() => {
      if (!done) finish();
    }, 60000);
  }

  // Hiện sau 6s (không hiện ngay) — để user ổn định + tránh đè popup khác
  setTimeout(show, 6000);
}
