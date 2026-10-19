// modules/trollSound.js — "Nút bấm không thể im lặng" (Phase 5.1)
// Nút "Phát âm thanh" ở vị trí dễ thấy. Khi bấm, file troll.mp3 (8.6s, do user cung cấp)
// phát và lặp lại vô hạn cho đến khi tìm ra nút tắt.
// Theo chính sách autoplay, âm thanh chỉ phát sau khi user tương tác (click),
// nên nút bấm chính là "chìa khóa" hợp lệ để mở khóa âm thanh.
// Troll có tâm: nút tắt 'x' cực nhỏ ở góc dưới phải, sau 20s trở nên tìm được hơn
// (to hơn, đỏ, chữ "TẮT ÂM THANH"). Không khóa cứng âm thanh.

let audioElement = null;
let started = false;

export function init() {
  if (started) return;
  started = true;
  if (document.getElementById('troll-audio')) return;

  // 1. Thẻ audio (chưa autoplay) — file user cung cấp, copy vào assets/troll.mp3
  // Phase 6: dùng import.meta.url để resolve đúng trên GitHub Pages subpath
  // (từ js/modules/trollSound.js, ../../ lùi về repo-root, rồi vào assets/troll.mp3)
  audioElement = document.createElement('audio');
  audioElement.id = 'troll-audio';
  audioElement.src = new URL('../../assets/troll.mp3', import.meta.url).href;
  audioElement.loop = true; // lặp vô hạn
  audioElement.preload = 'auto';
  document.body.appendChild(audioElement);

  // 2. Nút "Phát âm thanh" — CSS trong css/phase5.css
  const btn = document.createElement('button');
  btn.id = 'troll-sound-btn';
  btn.type = 'button';
  btn.textContent = '🔊 Bấm để nghe thông báo quan trọng';
  document.body.appendChild(btn);

  // 3. Click -> phát (đã được mở khóa bởi click), ẩn nút để không bấm lại được
  btn.addEventListener('click', () => {
    audioElement.play().catch((e) => {
      console.warn('Không thể phát âm thanh:', e);
      const err = document.createElement('div');
      err.id = 'troll-sound-error';
      err.textContent = 'Không phát được âm thanh. Kiểm tra file assets/troll.mp3 có tồn tại không.';
      document.body.appendChild(err);
      setTimeout(() => err.remove(), 5000);
    });
    btn.style.display = 'none';
  });

  // 4. Nút "Tắt tiếng" cực nhỏ và khó tìm — lối thoát
  const muteBtn = document.createElement('button');
  muteBtn.id = 'troll-mute-btn';
  muteBtn.type = 'button';
  muteBtn.textContent = 'x';
  muteBtn.title = 'Tắt âm thanh troll (nếu tìm thấy)';
  muteBtn.addEventListener('click', () => {
    audioElement.pause();
    audioElement.currentTime = 0;
    muteBtn.style.display = 'none';
  });
  document.body.appendChild(muteBtn);

  // Sau 20s, nút tắt trở nên tìm được hơn (to hơn, đỏ)
  setTimeout(() => {
    muteBtn.textContent = 'TẮT ÂM THANH';
    muteBtn.classList.add('findable');
  }, 20000);
}

// Cho phép module khác / fakeMute dừng troll audio nếu cần
export function stopTrollSound() {
  if (audioElement) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }
}
