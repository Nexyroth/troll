// modules/invisibleCow.js
// Tìm con bò vô hình — meme kinh điển từ The Useless Web.
// Có một con bò vô hình đâu đó trên trang. Khi di chuột đến gần:
// - Phát ra tiếng "MOO" (bằng WebAudio, không cần file)
// - Hiện một chấm sáng nhỏ
// Khi tìm thấy (rất gần), hiện thông báo rồi bò chạy chỗ khác.

import { randomInt } from '../utils/random.js';
import { el } from '../utils/dom.js';

let cowX = 0;
let cowY = 0;
let lastMoo = 0;
let found = false;

function placeCow() {
  cowX = randomInt(80, Math.max(120, window.innerWidth - 80));
  cowY = randomInt(80, Math.max(120, window.innerHeight - 80));
  found = false;
}

function moo(volume) {
  // Giả lập tiếng "MOO" bằng 2 oscillator trầm, không cần file audio
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(85, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    // kệ — không có audio thì vẫn còn chấm sáng
  }
}

export function init() {
  const dot = el('cowDot');
  const msg = el('cowMsg');
  if (!dot || !msg) return;

  placeCow();

  document.addEventListener('mousemove', (e) => {
    const dx = cowX - e.clientX;
    const dy = cowY - e.clientY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 140 && !found) {
      // Hiện chấm sáng khi gần
      dot.classList.add('show');
      dot.style.left = cowX + 'px';
      dot.style.top = cowY + 'px';

      // MOO càng to khi càng gần, throttle 600ms để không spam
      const now = Date.now();
      if (now - lastMoo > 600) {
        lastMoo = now;
        const volume = Math.max(0.05, 0.25 * (1 - dist / 140));
        moo(volume);
      }

      // Tìm thấy khi rất gần
      if (dist < 30) {
        found = true;
        msg.classList.add('show');
        setTimeout(() => {
          msg.classList.remove('show');
          dot.classList.remove('show');
          placeCow(); // bò chạy chỗ khác
        }, 3000);
      }
    } else if (dist >= 140) {
      dot.classList.remove('show');
    }
  }, { passive: true });

  // Hint nhỏ: bò cũng di chuyển chỗ khác mỗi 45s nếu không ai tìm thấy
  setInterval(() => {
    if (!found) placeCow();
  }, 45000);
}
