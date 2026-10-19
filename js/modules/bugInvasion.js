// modules/bugInvasion.js
// Gián bò khắp trang. Không ảnh hưởng chức năng, chỉ ảnh hưởng tinh thần.
// - 4 con bọ 🐛 bò lang thang, di chuyển ngẫu nhiên mỗi 2s
// - Click để "giết", chúng hồi sinh sau 10s

import { randomInt } from '../utils/random.js';

const BUG = '🐛';
const COUNT = 4;
const SPEED_MS = 2000;
const RESPAWN_MS = 10000;

function createBug() {
  const bug = document.createElement('span');
  bug.textContent = BUG;
  bug.className = 'bug-invasion';
  bug.title = 'Bấm để giết (nó sẽ hồi sinh)';
  bug.style.left = randomInt(0, Math.max(0, window.innerWidth - 40)) + 'px';
  bug.style.top = randomInt(0, Math.max(0, window.innerHeight - 40)) + 'px';

  // Dùng addEventListener, không dùng onclick inline
  bug.addEventListener('click', () => {
    bug.remove();
    // Hồi sinh sau 10s — bọ không bao giờ chết thật
    setTimeout(() => createBug(), RESPAWN_MS);
  });

  document.body.appendChild(bug);

  const timer = setInterval(() => {
    if (!bug.isConnected) {
      clearInterval(timer);
      return;
    }
    bug.style.left = randomInt(0, Math.max(0, window.innerWidth - 40)) + 'px';
    bug.style.top = randomInt(0, Math.max(0, window.innerHeight - 40)) + 'px';
  }, SPEED_MS);
}

export function init() {
  for (let i = 0; i < COUNT; i++) createBug();
}
