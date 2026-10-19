// modules/fakeMute.js — Nút tắt tiếng giả (Phase 3)
// Nút 🔊 / 🔇 ở góc màn hình. Khi bấm để tắt tiếng, âm lượng lại tăng gấp 10 lần.
// Icon đổi sang 🔇 nhưng tiếng bíp WebAudio vẫn phát TO HƠN.
// Điều khiển volume thật trong audio.js qua setVolume().

import { el } from '../utils/dom.js';
import { setVolume, getVolume, beep } from './audio.js';

export function init() {
  const btn = el('fakeMuteBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isMutedIcon = btn.textContent.includes('🔇');
    if (!isMutedIcon) {
      // "Tắt tiếng": icon thành 🔇 nhưng volume 0.03 -> 0.3 (gấp 10 lần)
      btn.textContent = '🔇 Đã tắt tiếng (tin được không?)';
      setVolume(0.3);
      // Bíp 1 cái thật to để user "cảm nhận" sự tắt tiếng
      beep(880);
    } else {
      btn.textContent = '🔊 Bật tiếng';
      setVolume(0.03);
    }
    btn.dataset.volume = String(getVolume());
  });
}
