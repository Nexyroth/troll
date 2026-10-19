// modules/phase7Orchestrator.js — Điều phối Phase 7 (Trói Buộc + Nỗi Sợ HĐH)
// - ghostCursor: chạy ngay (chỉ lắng nghe mousemove, không popup nên không đè ai)
// - volumeTroll: sau 18s (popup nhỏ góc phải, không phải modal nên đè nhẹ vẫn ổn)
// - virusScarePro: sau 30s, nhưng đợi không còn modal khác mới hiện (tối đa 30s)
//   vì virusScarePro là overlay toàn màn hình — đè lên cookieHell / ToS sẽ rối.
// Mỗi module tự có Esc / ✕ / tự đóng nên chuỗi không kẹt.

async function loadAndInit(path, label) {
  try {
    const mod = await import(path);
    if (typeof mod.init === 'function') mod.init();
  } catch (e) {
    console.warn(`[Phase7] Không load được ${label} (${path}):`, e);
    window.__trollLoadErrors = window.__trollLoadErrors || [];
    window.__trollLoadErrors.push({ module: label, stage: 'import', error: String(e) });
  }
}

function waitForNoModalThen(fn) {
  const start = Date.now();
  const MAX_WAIT_MS = 30000;
  const MODAL_SELECTORS = [
    '#music-prompt-overlay',
    '.cookie-hell-popup', // cookieHell dùng class, không có id
    '#age-verify-popup',
    '#tos-popup',
    '.virus-pro-overlay',
    '#sureOverlay',
    '#deleteDialogOverlay',
  ].join(',');
  function check() {
    const anyModal = document.querySelector(MODAL_SELECTORS);
    if (!anyModal || Date.now() - start > MAX_WAIT_MS) {
      fn();
      return;
    }
    setTimeout(check, 1000);
  }
  check();
}

export function init() {
  // Ghost cursor chạy ngay
  loadAndInit('./ghostCursor.js', 'ghostCursor');

  // Volume troll sau 18s
  setTimeout(() => {
    loadAndInit('./volumeTroll.js', 'volumeTroll');
  }, 18000);

  // Virus Scare Pro sau 30s, đợi không còn modal khác
  setTimeout(() => {
    waitForNoModalThen(() => {
      loadAndInit('./virusScarePro.js', 'virusScarePro');
    });
  }, 30000);
}
