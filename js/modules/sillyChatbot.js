// modules/sillyChatbot.js — [MEME MỚI] Chatbot ngớ ngẩn
// Luôn trả lời "Hmm... interesting" hoặc các câu vô nghĩa.
// Không hiểu gì cả, nhưng rất tự tin.

import { randomChoice } from '../utils/random.js';
import { el } from '../utils/dom.js';

const REPLIES = [
  'Hmm... interesting.',
  'Bạn có chắc không?',
  'Tôi không hiểu, nhưng tôi ủng hộ bạn.',
  'Câu hỏi hay. Tôi sẽ không trả lời.',
  'Bạn thử hỏi lại sau 3-5 ngày làm việc xem.',
  'Ồ wow. Thật luôn?',
  'Tôi là chatbot. Tôi không có cảm xúc. Nhưng câu này làm tôi buồn.',
  'Vui lòng đợi... (đang đợi mãi mãi)',
  'Bạn có muốn mua thêm dung lượng chatbot không?',
];

function addMsg(container, text, who) {
  const div = document.createElement('div');
  div.textContent = (who === 'bot' ? '🤖 Bot: ' : 'Bạn: ') + text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

export function init() {
  const box = el('chatbot');
  const messages = el('chatbotMessages');
  const input = el('chatbotInput');
  const send = el('chatbotSend');
  const closeBtn = el('chatbotClose');
  if (!box || !messages || !input) return;

  addMsg(messages, 'Xin chào! Tôi có thể giúp gì? (Không.)', 'bot');

  function reply() {
    const text = input.value.trim();
    if (!text) return;
    addMsg(messages, text, 'user');
    input.value = '';
    // Delay 800ms để giả vờ "đang suy nghĩ"
    setTimeout(() => {
      addMsg(messages, randomChoice(REPLIES), 'bot');
    }, 800);
  }

  if (send) send.addEventListener('click', reply);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') reply();
  });

  // Nút X cũng không đóng thật — nó chỉ mở lại sau 3s
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      box.style.display = 'none';
      setTimeout(() => (box.style.display = 'block'), 3000);
    });
  }
}
