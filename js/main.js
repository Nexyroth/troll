// main.js — Điểm khởi chạy duy nhất
// Chỉ import + gọi init(). Không chứa logic troll ở đây.
// Muốn thêm tính năng mới: tạo file trong js/modules/, thêm 1 dòng vào MODULES.
//
// QUAN TRỌNG — vì sao dùng dynamic import() + try/catch thay vì import tĩnh:
// Trước đây main.js dùng `import ... from './modules/...'` tĩnh. Với ES Modules,
// chỉ cần 1 file trong chuỗi import bị 404 (ví dụ sai đường dẫn) là TOÀN BỘ
// module graph fail, main.js không chạy, không có event listener nào được gắn,
// trang trông như "đứng hình, không ấn được gì" — đúng bug đã xảy ra ở Phase 4/5:
// trollOrchestrator + phase5Orchestrator import sai './modules/...' thay vì './...',
// khiến 9 file 404 và chết cả trang. Ở đây mỗi module được load riêng, lỗi 1
// module chỉ skip module đó, các module khác vẫn chạy. Lỗi được gom vào
// window.__trollLoadErrors để debug trong Console.

window.__trollLoadErrors = window.__trollLoadErrors || [];

const MODULES = [
  // Kinh điển
  { name: 'audio', path: './modules/audio.js' },
  { name: 'popupManager', path: './modules/popupManager.js' },
  { name: 'runawayButton', path: './modules/runawayButton.js' },
  { name: 'progressBar', path: './modules/progressBar.js' },
  { name: 'textScrambler', path: './modules/textScrambler.js' },
  { name: 'captcha', path: './modules/captcha.js' },
  { name: 'cookieBanner', path: './modules/cookieBanner.js' },
  { name: 'cursorTrail', path: './modules/cursorTrail.js' },
  { name: 'chaserBox', path: './modules/chaserBox.js' },
  { name: 'titleFlicker', path: './modules/titleFlicker.js' },
  { name: 'backgroundFlicker', path: './modules/backgroundFlicker.js' },
  // Meme đợt 1 — 6 tính năng nâng tầm trải nghiệm (theo nghĩa tiêu cực)
  { name: 'scrollReverser', path: './modules/scrollReverser.js' },
  { name: 'fakeCrash', path: './modules/fakeCrash.js' },
  { name: 'endlessSpinner', path: './modules/endlessSpinner.js' },
  { name: 'sillyChatbot', path: './modules/sillyChatbot.js' },
  { name: 'wasteScore', path: './modules/wasteScore.js' },
  // Meme đợt 2 — 8 huyền thoại anti-UX
  { name: 'loginPortal', path: './modules/loginPortal.js' },
  { name: 'cancelConfirmSwap', path: './modules/cancelConfirmSwap.js' },
  { name: 'gravityFlip', path: './modules/gravityFlip.js' },
  { name: 'teapotRain', path: './modules/teapotRain.js' },
  { name: 'bugInvasion', path: './modules/bugInvasion.js' },
  { name: 'invisibleCow', path: './modules/invisibleCow.js' },
  { name: 'textMutation', path: './modules/textMutation.js' },
  { name: 'fakeUpdate', path: './modules/fakeUpdate.js' },
  // Phase 3: The Despair Pack — 5 meme tuyệt vọng
  { name: 'impossibleForm', path: './modules/impossibleForm.js' },
  { name: 'areYouSureLoop', path: './modules/areYouSureLoop.js' },
  { name: 'fakeMute', path: './modules/fakeMute.js' },
  { name: 'scrollHijack', path: './modules/scrollHijack.js' },
  { name: 'languageSwitch', path: './modules/languageSwitch.js' },
  // Phase 4: Mỗi Thiết Bị Một Nỗi Đau — nhạc trưởng chọn troll theo OS
  { name: 'trollOrchestrator', path: './modules/trollOrchestrator.js' },
  // Phase 5: Troll Sound + Cookie Hell + Age Verify + ToS — điều phối theo chuỗi
  { name: 'phase5Orchestrator', path: './modules/phase5Orchestrator.js' },
  // Phase 6: Music Prompt — popup mở nhạc, 1 từ chối thật + 2 đồng ý trá hình
  // Music Prompt hiện sau 6s (bên trong module). Phase 5 cookieHell sẽ đợi
  // musicPrompt đóng xong mới hiện, để không đè 2 modal lên nhau.
  { name: 'musicPrompt', path: './modules/musicPrompt.js' },
  // Phase 7: Trói Buộc + Nỗi Sợ HĐH — ghostCursor, volumeTroll, virusScarePro
  { name: 'phase7Orchestrator', path: './modules/phase7Orchestrator.js' },
];

for (const m of MODULES) {
  try {
    const mod = await import(m.path);
    try {
      if (typeof mod.init === 'function') mod.init();
    } catch (initErr) {
      console.warn(`[main] init() lỗi ở ${m.name}:`, initErr);
      window.__trollLoadErrors.push({ module: m.name, stage: 'init', error: String(initErr) });
    }
  } catch (importErr) {
    console.warn(`[main] Không load được ${m.name} (${m.path}):`, importErr);
    window.__trollLoadErrors.push({ module: m.name, stage: 'import', error: String(importErr) });
  }
}

// Lưu ý: popupManager đã bao gồm meme "nút Đóng / Đóng thật hoán đổi vị trí"
// nên tổng cộng có 28 meme: 6 đợt 1 + 8 đợt 2 + 5 Phase 3 + 1 troll theo OS (Phase 4)
// + 1 Phase 4.1 virus scare + 1 trollSound + 3 Phase 5.2 (cookieHell, ageVerify, tos)
// + 1 Phase 6 musicPrompt + 3 Phase 7 (ghostCursor, volumeTroll, virusScarePro).
// osDetector + 4 orchestrator không tính là meme — chúng chỉ điều phối.
