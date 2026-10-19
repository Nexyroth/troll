// modules/areYouSureLoop.js — Vòng lặp "Bạn có chắc chắn?" (Phase 3)
// Nút "Đóng trang web". Bấm vào hiện popup "Bạn có chắc muốn đóng?"
// Bấm "Có" -> hiện câu tiếp theo. Bấm "Không" -> CŨNG hiện câu tiếp theo.
// Lặp 10 lần với các câu hỏi ngày càng vô nghĩa, rồi mới "tha" cho user.

import { el } from '../utils/dom.js';

const QUESTIONS = [
  'Bạn có chắc muốn đóng?',
  'Bạn thực sự chắc chắn?',
  'Bạn chắc chắn 100% chứ?',
  'Mèo không đồng ý, bạn vẫn muốn đóng?',
  'Bạn có chắc là bạn chắc chắn không?',
  'Nếu bạn chắc chắn, hãy bấm Có để tiếp tục kẹt.',
  'Bạn đã suy nghĩ kỹ chưa? Suy nghĩ lại đi.',
  'Đóng trang này sẽ khiến 1 con bọ buồn. Vẫn đóng?',
  'Bạn có chắc không, hay bạn chỉ đang bấm bừa?',
  'Câu hỏi cuối: bạn có chắc là bạn muốn hết bị hỏi không?',
];

let step = 0;

export function init() {
  const overlay = el('sureOverlay');
  const questionEl = el('sureQuestion');
  const yesBtn = el('sureYesBtn');
  const noBtn = el('sureNoBtn');
  const counterEl = el('sureCounter');
  const openBtn = document.querySelector('[data-action="open-sure-loop"]');
  if (!overlay || !questionEl || !yesBtn || !noBtn) return;

  function render() {
    questionEl.textContent = QUESTIONS[step];
    if (counterEl) counterEl.textContent = `Câu hỏi ${step + 1}/10`;
  }

  function next() {
    // Đang ở màn hình cuối (chờ đóng) thì bỏ qua click thêm — tránh double-timeout
    if (step >= QUESTIONS.length) return;
    step++;
    if (step >= QUESTIONS.length) {
      // Hết 10 câu: "tha" nhưng vẫn không đóng trang
      questionEl.textContent = 'Bạn đã trả lời 10 lần. Trang vẫn mở. Chúc mừng bạn đã kẹt. 🎉';
      if (counterEl) counterEl.textContent = 'Hết câu hỏi — bắt đầu lại từ đầu nếu bạn dám bấm tiếp.';
      // Đóng sau 2.5s và reset để lần sau lại hỏi từ đầu
      setTimeout(() => {
        overlay.classList.remove('show');
        step = 0;
      }, 2500);
      return;
    }
    render();
  }

  // Cả Có và Không đều đi tiếp — đó là điểm troll
  yesBtn.addEventListener('click', next);
  noBtn.addEventListener('click', next);

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      step = 0;
      render();
      overlay.classList.add('show');
    });
  }

  overlay.addEventListener('click', (e) => {
    // Bấm ra ngoài cũng không thoát — chỉ đóng khi hết 10 câu
    if (e.target === overlay) {
      questionEl.textContent = 'Bấm ra ngoài cũng không thoát được đâu. Trả lời đi.';
    }
  });
}
