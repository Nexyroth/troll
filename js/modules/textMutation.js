// modules/textMutation.js
// Chữ tự đổi. Mỗi 10–15 giây, một từ ngẫu nhiên trên trang bị thay
// bằng từ đồng nghĩa kỳ quặc hoặc emoji. Không thông báo, không hoàn tác.

import { randomChoice, randomInt } from '../utils/random.js';
import { isTranslating, isRaining } from '../utils/chaosState.js';

const MUTATIONS = [
  ['website', 'trang web (có thể)'],
  ['bạn', 'người đọc đáng nghi'],
  ['Bạn', 'Người đọc đáng nghi'],
  ['trang web', 'trang web (có thể)'],
  ['Việt Nam', 'Việt Nam (nghe nói vậy)'],
  ['chuyên nghiệp', 'chuyên nghiệp (tự nhận)'],
  ['thông báo', 'thông báo vô nghĩa'],
  ['cookie', 'bánh quy gián điệp'],
  ['Cookie', 'Bánh quy gián điệp'],
  ['tải', 'tải (mãi mãi)'],
  ['đăng nhập', 'đăng nhập (không được)'],
  ['mật khẩu', 'mật khẩu (ai cũng biết)'],
  ['tài khoản', 'tài khoản (có thể đã bị xóa)'],
  ['cập nhật', 'cập nhật (0 tính năng mới)'],
  ['Xin chào', 'Xin chào (có thể)'],
];

function collectTextNodes() {
  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentNode;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.nodeName;
      if (['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'BUTTON'].includes(tag)) return NodeFilter.FILTER_REJECT;
      if (parent.closest('#chatbot, #fakeCrash, #deleteDialog, #fakeUpdate, #teapotBanner, #cowMsg')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  return nodes;
}

function mutateOnce() {
  // Bỏ qua 1 lượt nếu đang dịch / mưa ấm trà — để module kia khôi phục đúng text gốc
  if (isTranslating() || isRaining()) return;
  const nodes = collectTextNodes();
  if (nodes.length === 0) return;

  // Thử vài lần để tìm node chứa từ có thể mutate
  for (let attempt = 0; attempt < 8; attempt++) {
    const node = randomChoice(nodes);
    const text = node.textContent;
    const candidates = MUTATIONS.filter(([from]) => text.includes(from));
    if (candidates.length === 0) continue;
    const [from, to] = randomChoice(candidates);
    // Chỉ thay 1 lần xuất hiện đầu tiên để trông "tự nhiên"
    node.textContent = text.replace(from, to);
    return;
  }
}

export function init() {
  function schedule() {
    setTimeout(() => {
      mutateOnce();
      schedule();
    }, randomInt(10000, 15000));
  }
  schedule();
}
