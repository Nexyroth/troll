// modules/impossibleAgeVerify.js — "Xác minh tuổi bằng năm loài vật" (Phase 5.2)
// Yêu cầu chọn "linh vật" và tính tuổi theo hệ quy chiếu của loài đó.
// Chó ×7, Mèo năm lẻ ×15 / năm chẵn ×8 (theo sườn gốc), Rùa ×π×4, Voi cơ số 8 ×3.
// Câu trả lời đúng là ngẫu nhiên và không ai đoán được — luôn báo sai.
// Để trông "có kiểm tra thật", module tính tuổi linh vật từ input rồi nhét vào lỗi.
// Troll có tâm: nút ✕ sau 15s + tự đóng sau 90s. onDone khi đóng.

let started = false;

const ANIMALS = {
  dog: { label: 'Chó (×7)', calc: (age) => age * 7 },
  cat: { label: 'Mèo (năm lẻ ×15, năm chẵn ×8)', calc: (age) => (age % 2 === 1 ? age * 15 : age * 8) },
  tortoise: { label: 'Rùa (×π×4)', calc: (age) => Math.round(age * Math.PI * 4) },
  elephant: { label: 'Voi (cơ số 8, ×3)', calc: (age) => parseInt(age.toString(8), 10) * 3 || age * 3 },
};

const ERRORS = [
  (animalAge) => `Sai. Theo linh vật, tuổi của bạn phải là ${animalAge} tuổi linh vật, không phải số bạn nhập.`,
  () => 'Sai. Vui lòng thử lại với một linh vật khác.',
  () => 'Hệ thống không thể xác minh. Có vẻ bạn là người ngoài hành tinh.',
  () => 'Gần đúng, nhưng không đủ "linh thiêng".',
  (animalAge) => `Sai. Bạn nhập tuổi người, chúng tôi cần tuổi ${animalAge} theo linh vật. Đọc kỹ lại đi.`,
];

export function init(onDone) {
  if (started) return;
  started = true;
  if (document.getElementById('age-verify-popup')) return;

  let done = false;
  function finish() {
    if (done) return;
    done = true;
    popup.remove();
    if (typeof onDone === 'function') onDone();
  }

  const popup = document.createElement('div');
  popup.id = 'age-verify-popup';
  popup.className = 'age-verify-popup';
  popup.innerHTML = `
    <button class="age-verify-x" type="button" hidden>✕</button>
    <h3>🔞 Xác minh độ tuổi</h3>
    <p class="hint">Vui lòng chọn linh vật của bạn và tính tuổi theo hệ quy chiếu tương ứng.</p>
    <select id="age-animal">
      <option value="dog">Chó (×7)</option>
      <option value="cat">Mèo (năm lẻ ×15, năm chẵn ×8)</option>
      <option value="tortoise">Rùa (×π×4)</option>
      <option value="elephant">Voi (cơ số 8, ×3)</option>
    </select>
    <input id="age-input" type="number" placeholder="Nhập tuổi của bạn..." min="0">
    <button id="age-verify-btn" class="age-verify-btn" type="button">Xác minh</button>
    <p id="age-result" class="age-verify-result"></p>
  `;
  document.body.appendChild(popup);

  const xBtn = popup.querySelector('.age-verify-x');
  setTimeout(() => {
    if (xBtn && popup.isConnected) xBtn.hidden = false;
  }, 15000);
  xBtn.addEventListener('click', finish);

  const result = document.getElementById('age-result');
  document.getElementById('age-verify-btn').addEventListener('click', () => {
    const animalKey = document.getElementById('age-animal').value;
    const raw = document.getElementById('age-input').value;
    const age = parseInt(raw, 10);
    if (Number.isNaN(age) || age <= 0) {
      result.textContent = 'Vui lòng nhập tuổi hợp lệ. (Nhập xong cũng sai thôi.)';
      return;
    }
    const animalAge = ANIMALS[animalKey].calc(age);
    // Luôn sai — chọn lỗi ngẫu nhiên, có nhét tuổi linh vật để trông như đã tính
    const pick = ERRORS[Math.floor(Math.random() * ERRORS.length)];
    result.textContent = pick(animalAge);
    setTimeout(() => {
      if (result.isConnected) result.textContent = '';
    }, 3000);
  });

  // Tự đóng sau 90s
  setTimeout(finish, 90000);
}
