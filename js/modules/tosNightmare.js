// modules/tosNightmare.js — "Điều khoản dịch vụ không hồi kết" (Phase 5.2)
// Hộp thoại ToS với 30 điều khoản, tải dần khi mở (300ms/điều).
// Nút "Chấp nhận" không bấm được cho đến khi đọc hết (checkbox enable sau khi tải xong
// + phải tick checkbox). Khi bấm Chấp nhận, checkbox tự bỏ chọn và điều khoản mới
// xuất hiện, buộc phải cuộn lại từ đầu — không bao giờ xong.
// Troll có tâm: nút ✕ sau 15s + tự đóng sau 120s. onDone khi đóng.

let started = false;

const DIEU_KHOAN = [
  'Không bảo hành về "cảm giác" (No Warranty of Vibe).',
  'Luật điều chỉnh: một khu vực tài phán sẽ được xác định sau.',
  'Bạn đồng ý rằng mọi quyết định của chúng tôi là cuối cùng.',
  'Bạn không được phép đọc điều khoản này một cách khó chịu.',
  'Trang web có quyền thay đổi điều khoản mà không cần báo trước, báo sau, hoặc báo gì cả.',
  'Bằng việc đọc câu này, bạn đã đồng ý với câu tiếp theo.',
  'Mọi khiếu nại phải được gửi bằng thư tay, viết bằng mực vô hình.',
  'Bạn đồng ý rằng nút "Chấp nhận" chỉ là gợi ý, không phải hành động.',
  'Chúng tôi có quyền thu thập dữ liệu về việc bạn đọc dữ liệu.',
  'Nếu bạn hiểu điều khoản này, vui lòng quên nó đi ngay.',
  'Thời gian đọc tối thiểu là 47 năm. Đọc nhanh hơn sẽ bị tính là chưa đọc.',
  'Bạn không được chụp màn hình điều khoản này, trừ khi chụp bằng trí nhớ.',
  'Mọi từ trong điều khoản đều mang nghĩa chúng tôi muốn, không phải nghĩa từ điển.',
  'Bạn đồng ý không đồng ý với bất kỳ điều gì chúng tôi không đồng ý.',
  'Điều khoản này áp dụng cho cả kiếp trước và kiếp sau của bạn.',
  'Nếu bạn cuộn quá nhanh, điều khoản sẽ tự thêm 5 điều mới.',
  'Bạn phải đọc to điều khoản này cho mèo nhà bạn nghe. Mèo đồng ý thay bạn.',
  'Chúng tôi không chịu trách nhiệm nếu bạn cảm thấy bị troll.',
  'Việc bấm "Chấp nhận" không có nghĩa là bạn đã chấp nhận.',
  'Bạn đồng ý rằng bạn đã đọc hết, kể cả phần bạn chưa đọc.',
  'Điều khoản này được viết bằng ngôn ngữ mà chỉ chúng tôi hiểu.',
  'Bạn không được phép hỏi "điều khoản này nghĩa là gì".',
  'Mọi tranh chấp sẽ được giải quyết bằng oẳn tù tì 3 ván.',
  'Bạn đồng ý rằng trang web luôn đúng, kể cả khi sai.',
  'Nếu bạn tìm thấy lỗi trong điều khoản, lỗi đó thuộc về bạn.',
  'Bạn phải giữ bí mật về việc điều khoản này tồn tại.',
  'Điều khoản này tự hủy sau khi bạn đọc xong. Nhưng bạn sẽ không bao giờ đọc xong.',
  'Bạn đồng ý rằng bạn không đồng ý, nhưng vẫn đồng ý.',
  'Mọi quyền đều thuộc về chúng tôi, bao gồm quyền thuộc về bạn.',
  'Điều cuối cùng: cảm ơn bạn đã đọc. Bây giờ hãy đọc lại từ đầu.',
];

export function init(onDone) {
  if (started) return;
  started = true;
  if (document.getElementById('tos-popup')) return;

  let done = false;
  let acceptCount = 0;

  function finish() {
    if (done) return;
    done = true;
    clearInterval(loadTimer);
    popup.remove();
    if (typeof onDone === 'function') onDone();
  }

  const popup = document.createElement('div');
  popup.id = 'tos-popup';
  popup.className = 'tos-popup';
  popup.innerHTML = `
    <button class="tos-x" type="button" hidden>✕</button>
    <h3>📜 Điều khoản dịch vụ</h3>
    <div class="tos-progress">Đang tải điều khoản... 0/30</div>
    <div id="tos-content" class="tos-content"></div>
    <label class="tos-label">
      <input type="checkbox" id="tos-checkbox" disabled> Tôi đã đọc và đồng ý với tất cả điều khoản
    </label>
    <button id="tos-accept-btn" class="tos-accept-btn" type="button" disabled>Chấp nhận</button>
  `;
  document.body.appendChild(popup);

  const content = document.getElementById('tos-content');
  const progressEl = popup.querySelector('.tos-progress');
  const checkbox = document.getElementById('tos-checkbox');
  const btn = document.getElementById('tos-accept-btn');
  const xBtn = popup.querySelector('.tos-x');

  setTimeout(() => {
    if (xBtn && popup.isConnected) xBtn.hidden = false;
  }, 15000);
  xBtn.addEventListener('click', finish);

  // Tải dần 30 điều khoản, 300ms/điều
  let daTai = 0;
  const loadTimer = setInterval(() => {
    if (done) {
      clearInterval(loadTimer);
      return;
    }
    if (daTai >= 30) {
      clearInterval(loadTimer);
      checkbox.disabled = false; // cho phép tick sau khi tải hết
      if (progressEl) progressEl.textContent = 'Đã tải 30/30 điều khoản. Bây giờ bạn có thể tick.';
      return;
    }
    const p = document.createElement('p');
    p.textContent = `Điều ${daTai + 1}: ${DIEU_KHOAN[daTai]}`;
    content.appendChild(p);
    daTai++;
    if (progressEl) progressEl.textContent = `Đang tải điều khoản... ${daTai}/30`;
  }, 300);

  checkbox.addEventListener('change', () => {
    btn.disabled = !checkbox.checked;
  });

  btn.addEventListener('click', () => {
    // Troll: checkbox tự bỏ chọn, thêm điều khoản mới, cuộn về đầu
    acceptCount++;
    checkbox.checked = false;
    btn.disabled = true;
    const p = document.createElement('p');
    p.className = 'tos-new';
    p.textContent = `Điều 47.${2 + acceptCount}: Điều khoản mới yêu cầu bạn phải cuộn lại từ đầu. (Lần chấp nhận thứ ${acceptCount})`;
    content.appendChild(p);
    const countP = document.createElement('p');
    countP.className = 'tos-count';
    countP.textContent = `Bạn đã "chấp nhận" ${acceptCount} lần. Vẫn chưa xong.`;
    content.appendChild(countP);
    content.scrollTop = 0;
    if (progressEl) progressEl.textContent = `Đã thêm điều khoản mới. Tổng: ${30 + acceptCount} điều. Hãy đọc lại.`;
  });

  // Tự đóng sau 120s (ToS cần thời gian đọc lâu hơn)
  setTimeout(finish, 120000);
}
