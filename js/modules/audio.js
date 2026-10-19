// modules/audio.js — Âm thanh WebAudio, không cần file ngoài
// Dùng oscillator vuông cho tiếng bíp "khó chịu nhưng hợp lệ".
// Volume là state chia sẻ: fakeMute.js điều khiển nó.

let ctx = null;
let volume = 0.03; // mức mặc định — fakeMute sẽ "tắt" bằng cách tăng lên 0.3

export function getVolume() { return volume; }
export function setVolume(v) { volume = v; }

function getCtx() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      // Kệ — trình duyệt không hỗ trợ thì im lặng chịu đựng
      return null;
    }
  }
  // AudioContext có thể bị suspended cho tới khi user tương tác
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

/** Phát 1 tiếng bíp ngắn. freq mặc định 440Hz */
export function beep(freq = 440) {
  try {
    const audioCtx = getCtx();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
  } catch (e) {
    // kệ
  }
}

export function init() {
  // Không làm gì lúc load — AudioContext chỉ tạo khi cần (khi beep).
  // Điều này tránh warning autoplay.
}
