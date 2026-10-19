// modules/languageSwitch.js — Thay đổi ngôn ngữ ngẫu nhiên (Phase 3)
// Ý tưởng "bí mật" ấp ủ từ Phase 2:
// Mỗi ~30 giây, toàn bộ text trên trang bị dịch sang ngôn ngữ ngẫu nhiên:
// - Latinh (giả — lorem ipsum style)
// - Klingon (nuqneH, Qapla'...)
// - Tiếng Việt nhưng bị đảo chữ (đảo ngược từng từ)
// Không thông báo, tự động khôi phục sau 10 giây.
// Không chạy cùng lúc với teapotRain — dùng chaosState để tránh đè text nhau.

import { randomChoice, randomInt } from '../utils/random.js';
import { isRaining, isTranslating, setTranslating } from '../utils/chaosState.js';

const LATIN = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud'];
const KLINGON = ['nuqneH', "Qapla'", 'batlh', 'tlhIngan', 'Hol', 'mu', 'ghaytan', 'HIja', 'maj', 'toH', 'qatlho', 'QaQ', 'yIn', 'SoH', 'cha', 'wej', 'loS', 'vagh', 'Duj', 'nuq'];

function collectTextNodes() {
  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentNode;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.nodeName;
      if (['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(tag)) return NodeFilter.FILTER_REJECT;
      if (parent.closest('#chatbot, #fakeCrash, #deleteDialog, #fakeUpdate, #teapotBanner, #cowMsg, #sureOverlay')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  return nodes;
}

function translateText(text, lang) {
  // Giữ nguyên khoảng trắng / dấu câu ở mức đơn giản: tách theo khoảng trắng
  return text.split(/(\s+)/).map((token) => {
    if (!token.trim()) return token;
    if (lang === 'latin') return randomChoice(LATIN);
    if (lang === 'klingon') return randomChoice(KLINGON);
    // vietnamese-scrambled: đảo ngược từng từ ("Xin chào" -> "niX oàhc")
    if (lang === 'scrambled') {
      // Giữ nguyên dấu câu ở cuối từ nếu có
      const m = token.match(/^(.+?)([.,!?;:]*)$/);
      if (!m) return token;
      return m[1].split('').reverse().join('') + m[2];
    }
    return token;
  }).join('');
}

function triggerSwitch() {
  if (isTranslating() || isRaining()) {
    // Bỏ qua lượt này nếu teapot đang mưa hoặc đang dịch — tránh đè text
    scheduleNext();
    return;
  }
  const lang = randomChoice(['latin', 'klingon', 'scrambled']);
  const nodes = collectTextNodes();
  const originals = nodes.map((node) => node.textContent);

  setTranslating(true);
  nodes.forEach((node) => {
    node.textContent = translateText(node.textContent, lang);
  });
  // Đổi lang của <html> cho "ra vẻ" đang dịch thật
  const prevLang = document.documentElement.lang;
  document.documentElement.lang = lang === 'klingon' ? 'tlh' : lang === 'latin' ? 'la' : 'vi';

  // Tự động khôi phục sau 10s — không thông báo
  setTimeout(() => {
    nodes.forEach((node, i) => {
      if (node.isConnected) node.textContent = originals[i];
    });
    document.documentElement.lang = prevLang;
    setTranslating(false);
    scheduleNext();
  }, 10000);
}

function scheduleNext() {
  // Mỗi ~30s (25-35s) dịch một lần
  setTimeout(triggerSwitch, randomInt(25000, 35000));
}

export function init() {
  scheduleNext();
}
