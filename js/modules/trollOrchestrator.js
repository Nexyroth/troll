// modules/trollOrchestrator.js — "Nhạc trưởng" điều phối troll theo OS (Phase 4 + 4.1)
// - 5s: Phase 4 — troll theo OS (Windows update / Android pin / iOS iCloud)
// - 14s: Phase 4.1 — virus scare (Android 79 virus / iOS 44 virus)
//   Sườn Phase 4.1 gốc đề xuất 8s, nhưng Phase 4 Android popup sống tới ~10s
//   và iOS tới ~13s — chạy ở 8s sẽ đè 2 popup lên nhau. Dời sang 14s để
//   Phase 4 dọn xong rồi Phase 4.1 mới vào, vẫn giữ cảm giác "liên tiếp bị troll".
// - Windows -> chỉ Phase 4 (không có virus scare cho Windows trong Phase 4.1)
// - Unknown -> không troll theo OS, chỉ log
// Test: ?forceOS=windows | android | ios
//
// FIX BUG (2026-10-19): trước đây file này import tĩnh './modules/windowsTroll.js'
// (và 4 file tương tự). Vì file này đã nằm trong js/modules/, đường dẫn đúng
// phải là './windowsTroll.js'. Sai './modules/...' khiến trình duyệt tìm ở
// js/modules/modules/windowsTroll.js (không tồn tại) -> 404 -> cả module graph
// của main.js fail -> trang đứng hình, không ấn được gì. Đã sửa thành dynamic
// import() với đường dẫn đúng + try/catch, để 1 troll lỗi không giết cả trang.

async function loadAndInit(path, label) {
  try {
    const mod = await import(path);
    if (typeof mod.init === 'function') mod.init();
  } catch (e) {
    console.warn(`[Orchestrator] Không load được ${label} (${path}):`, e);
    window.__trollLoadErrors = window.__trollLoadErrors || [];
    window.__trollLoadErrors.push({ module: label, stage: 'import', error: String(e) });
  }
}

async function getEffectiveOS() {
  let getOS = null;
  try {
    const osMod = await import('./osDetector.js');
    getOS = osMod.getOS;
  } catch (e) {
    console.warn('[Orchestrator] Không load được osDetector, coi như Unknown:', e);
    return 'Unknown';
  }
  try {
    const param = new URLSearchParams(window.location.search).get('forceOS');
    if (param) {
      const normalized = param.trim().toLowerCase();
      if (normalized === 'windows' || normalized === 'windows phone') return 'Windows';
      if (normalized === 'android') return 'Android';
      if (normalized === 'ios' || normalized === 'iphone') return 'iOS';
      console.warn('[Orchestrator] forceOS không hợp lệ:', param, '— dùng OS detect thật.');
    }
  } catch (e) {
    // kệ — không parse được query thì dùng detect thật
  }
  return getOS();
}

export async function init() {
  const os = await getEffectiveOS();
  console.log('[Orchestrator] OS:', os, '(thêm ?forceOS=windows|android|ios để test OS khác)');

  setTimeout(() => {
    if (os === 'Windows' || os === 'Windows Phone') {
      loadAndInit('./windowsTroll.js', 'windowsTroll');
    } else if (os === 'Android') {
      loadAndInit('./androidTroll.js', 'androidTroll');
    } else if (os === 'iOS') {
      loadAndInit('./iosTroll.js', 'iosTroll');
    } else {
      console.log('[Orchestrator] OS Unknown — bỏ qua troll theo OS.');
    }
  }, 5000); // Phase 4: đợi 5 giây để người dùng "ổn định" rồi mới troll

  setTimeout(() => {
    if (os === 'Android') {
      loadAndInit('./androidVirusScare.js', 'androidVirusScare');
    } else if (os === 'iOS') {
      loadAndInit('./iosVirusScare.js', 'iosVirusScare');
    }
    // Windows / Unknown: không có virus scare trong Phase 4.1
  }, 14000); // Phase 4.1: đợi Phase 4 dọn xong rồi mới vào
}
