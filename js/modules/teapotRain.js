// modules/teapotRain.js
// Mưa ấm trà 418 — lấy từ The Useless Machine.
// Khi user gõ "tea" (ở bất kỳ đâu) hoặc bấm Ctrl+Shift+T:
// - Trận confetti gồm ấm trà 🫖 và trân châu 🧋 đổ xuống
// - Mọi text trên trang bị thay bằng "418: I'm a teapot" trong 3 giây, rồi khôi phục

import { randomChoice, randomInt } from '../utils/random.js';
import { el } from '../utils/dom.js';
import { isTranslating, isRaining, setRaining } from '../utils/chaosState.js';

const DROPS = ['🫖', '🧋', '🍵', '🧋', '🫖', '🍶'];
let raining = false;
let buffer = '';

function collectTextNodes() {
  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentNode;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.nodeName;
      if (['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(tag)) return NodeFilter.FILTER_REJECT;
      // Không đụng vào chatbot / fakeCrash / dialog để tránh rối
      if (parent.closest('#chatbot, #fakeCrash, #deleteDialog')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  return nodes;
}

function startRain() {
  // Không mưa cùng lúc với languageSwitch đang dịch — tránh 2 module đè text nhau
  if (raining || isRaining() || isTranslating()) return;
  raining = true;
  setRaining(true);

  // 1. Mưa ấm trà
  for (let i = 0; i < 32; i++) {
    setTimeout(() => {
      const drop = document.createElement('span');
      drop.className = 'teapot-drop';
      drop.textContent = randomChoice(DROPS);
      drop.style.left = randomInt(0, 95) + 'vw';
      drop.style.animationDelay = (Math.random() * 0.5) + 's';
      document.body.appendChild(drop);
      setTimeout(() => drop.remove(), 3500);
    }, i * 60);
  }

  // 2. Thay mọi text thành 418 trong 3s
  const nodes = collectTextNodes();
  const originals = nodes.map((node) => node.textContent);
  nodes.forEach((node) => { node.textContent = "418: I'm a teapot"; });

  const banner = el('teapotBanner');
  if (banner) banner.classList.add('show');

  setTimeout(() => {
    nodes.forEach((node, i) => {
      // Chỉ khôi phục nếu node vẫn còn trong DOM và vẫn đang là 418
      if (node.isConnected) node.textContent = originals[i];
    });
    if (banner) banner.classList.remove('show');
    raining = false;
    setRaining(false);
    buffer = '';
  }, 3000);
}

export function init() {
  // Gõ "tea" ở bất kỳ đâu
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 't') {
      e.preventDefault();
      startRain();
      return;
    }
    if (e.key.length === 1) {
      buffer = (buffer + e.key.toLowerCase()).slice(-3);
      if (buffer === 'tea') startRain();
    }
  });

  // Hint nhỏ trong console cho người tò mò
  console.log('%cGõ "tea" hoặc Ctrl+Shift+T để nhận mưa ấm trà 🫖', 'color:#0f0;background:#000;padding:4px;');
}
