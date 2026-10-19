// modules/phase5Orchestrator.js — Điều phối Phase 5 theo chuỗi, không đè popup nhau
// Chuỗi: trollSound (3s) -> đợi musicPrompt (Phase 6) đóng -> cookieHell
// -> khi cookieHell xong, đợi 3s -> ageVerify -> khi ageVerify đóng, đợi 3s -> tosNightmare.
// Phase 6 musicPrompt hiện sau 6s (bên trong module musicPrompt). Nếu cookieHell
// hiện ở 10s như trước, nó sẽ đè lên musicPrompt chưa đóng. Vì vậy ở đây:
// - trollSound vẫn ở 3s (nút nhỏ, không phải modal nên không đè)
// - cookieHell đợi cho tới khi #music-prompt-overlay biến mất, tối đa 25s rồi vẫn chạy
//   (để không kẹt mãi nếu user bỏ mặc musicPrompt, vì musicPrompt tự đóng sau 60s
//   nhưng chúng ta không đợi lâu vậy — 25s là đủ để user chọn).
// Mỗi popup cũng tự đóng sau 90-120s nên chuỗi không kẹt mãi nếu user bỏ mặc.
//
// FIX BUG (2026-10-19): trước đây file này import tĩnh './modules/trollSound.js'
// (và 3 file tương tự). Vì file này đã nằm trong js/modules/, đường dẫn đúng
// phải là './trollSound.js'. Sai './modules/...' khiến trình duyệt tìm ở
// js/modules/modules/trollSound.js (không tồn tại) -> 404 -> cả module graph
// của main.js fail -> trang đứng hình, không ấn được gì. Đã sửa thành dynamic
// import() với đường dẫn đúng + try/catch, để 1 troll lỗi chỉ skip troll đó
// chứ không giết cả chuỗi (chuỗi vẫn đi tiếp tới bước sau).

async function loadAndInit(path, label, onDone) {
  try {
    const mod = await import(path);
    if (typeof mod.init === 'function') mod.init(onDone);
  } catch (e) {
    console.warn(`[Phase5] Không load được ${label} (${path}):`, e);
    window.__trollLoadErrors = window.__trollLoadErrors || [];
    window.__trollLoadErrors.push({ module: label, stage: 'import', error: String(e) });
    // Lỗi thì vẫn đi tiếp chuỗi, không kẹt
    if (typeof onDone === 'function') onDone();
  }
}

function waitForMusicPromptThen(fn) {
  const start = Date.now();
  const MAX_WAIT_MS = 25000;
  function check() {
    const musicOpen = document.getElementById('music-prompt-overlay');
    if (!musicOpen || Date.now() - start > MAX_WAIT_MS) {
      fn();
      return;
    }
    setTimeout(check, 1000);
  }
  check();
}

export function init() {
  setTimeout(() => {
    loadAndInit('./trollSound.js', 'trollSound');
  }, 3000); // Hiện nút âm thanh sau 3 giây

  // CookieHell đợi musicPrompt đóng xong (tối đa 25s) rồi mới hiện
  waitForMusicPromptThen(() => {
    // Đợi thêm 1s cho modal musicPrompt đóng hẳn rồi mới hiện cookie
    setTimeout(() => {
      loadAndInit('./cookieHell.js', 'cookieHell', () => {
        // Cookie xong (hoặc bị đóng) -> đợi 3s rồi tới ageVerify
        setTimeout(() => {
          loadAndInit('./impossibleAgeVerify.js', 'impossibleAgeVerify', () => {
            // AgeVerify đóng -> đợi 3s rồi tới ToS
            setTimeout(() => {
              loadAndInit('./tosNightmare.js', 'tosNightmare');
            }, 3000);
          });
        }, 3000);
      });
    }, 1000);
  });
}
