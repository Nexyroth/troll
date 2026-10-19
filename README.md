# Trang web hoàn toàn bình thường 🌀

> ⚠️ **Cảnh báo:** Trang web này không dành cho người yếu tim hoặc những ai đang vội.

Một kiệt tác meme **anti-UX** — mã nguồn sạch một cách đáng ngờ, nhưng trải nghiệm thì là thảm họa có chủ đích.

## Cách chạy

Vì dự án dùng **ES Modules** (`type="module"`), không mở bằng `file://` (trình duyệt sẽ chặn CORS). Hãy chạy qua server tĩnh:

```bash
# Cách 1: Python (có sẵn trên hầu hết máy)
cd trang-web-binh-thuong
python3 -m http.server 8000
# rồi mở http://localhost:8000

# Cách 2: VS Code Live Server
# Chuột phải vào index.html -> Open with Live Server
```

## Tính năng (kèm emoji như đã hứa)

### Kinh điển (giữ nguyên từ bản gốc)
- 💥 **Popup sinh sôi** — Nút "Đóng" tạo thêm 2 popup. Popup tự biến mất sau 25s. Giới hạn `MAX_POPUP = 10`.
- 🏃 **Nút chạy trốn** — Hover là nhảy, cooldown 200ms chống kẹt.
- 📉 **Thanh tiến độ thụt lùi** — Luôn giảm, thỉnh thoảng reset về 100%.
- 🔀 **Ô nhập tự đảo chữ** — Hoán đổi 2 ký tự cuối mỗi lần gõ.
- 🤖 **Captcha bất khả thi** — Chọn đúng bao nhiêu cũng báo sai. Cố tình.
- 🍪 **Cookie banner bất tử** — Từ chối cũng thành chấp nhận, đóng rồi mở lại sau 6s.
- ✨ **Vệt emoji theo chuột** + 📦 **Hộp chaser** chạy trốn khỏi con trỏ.
- 🏷️ **Tiêu đề tab nhảy loạn** — Đổi title mỗi 2s.
- 🔊 **Âm thanh WebAudio** — Bíp bằng oscillator, không cần file ngoài.
- 😎 **Giảm chói** — Nút duy nhất dùng thật được. Tắt nhấp nháy + ẩn popup.

### Meme đợt 1 (nâng tầm ức chế)
- 🔄 **Scroll đảo ngược** — Thỉnh thoảng đảo ngược hướng cuộn trong 4s.
- 💙 **Fake system crash** — Màn hình xanh giả 2s rồi biến mất.
- 🔁 **Nút popup đổi chỗ** — "Đóng" và "Đóng thật" hoán đổi vị trí ngẫu nhiên (40%).
- ⏳ **Loading không bao giờ kết thúc** — Spinner góc trái dưới quay mãi, % nhảy loạn.
- 🤖 **Chatbot ngớ ngẩn** — Luôn trả lời "Hmm... interesting" hoặc câu vô nghĩa. Nút X cũng tự mở lại sau 3s.
- ⏱️ **Điểm lãng phí thời gian** — +10 mỗi click, +1 mỗi lần di chuột, +5 mỗi 10s ở lại trang.

### Meme đợt 2 — 8 huyền thoại 🧨
- 🔐 **Login Portal không thể chạm** — Ô email né cursor trong 200px, càng gần càng chạy nhanh. Gõ vào email thì mật khẩu tự xóa ký tự. Sau 12 lần né, field trông như đang bật nhưng thật ra `disabled`.
- 🔄 **Hủy = Xóa** — Dialog xóa tài khoản: bấm "Hủy" thì xóa (giả), bấm "Xóa" thì hủy bỏ. Label đúng, hành vi ngược.
- 🙃 **Gravity Flip** — Trang nghiêng dần 0.05°/giây (khó nhận ra), sau 25-50s hoặc 25 click thì lật 180° trong 3s rồi trở lại.
- 🫖 **Mưa ấm trà 418** — Gõ `tea` hoặc `Ctrl+Shift+T`: mưa 🫖🧋 đổ xuống, mọi text thành `418: I'm a teapot` trong 3s rồi khôi phục.
- 🐛 **Bug Invasion** — 4 con 🐛 bò lang thang, di chuyển mỗi 2s. Click để giết, hồi sinh sau 10s.
- 🐮 **Invisible Cow** — Bò vô hình đâu đó trên trang. Di chuột gần thì nghe "MOO" + chấm sáng vàng. Tìm thấy thì bò chạy chỗ khác.
- 🔤 **Text Mutation** — Mỗi 10-15s, 1 từ ngẫu nhiên bị thay bằng từ kỳ quặc: `website` → `trang web (có thể)`, `bạn` → `người đọc đáng nghi`. Không thông báo, không hoàn tác.
- 🔔 **Fake Update** — Banner "Bản cập nhật 2.0 đã sẵn sàng. Khởi động lại để nhận 0 tính năng mới." Bấm khởi động lại thì chạy animation 5s rồi `location.reload()` — không có gì thay đổi.

### Phase 3: The Despair Pack 😩
- 🔒 **Impossible Form** — "Mật khẩu phải dài >8, không số, không chữ, có ký tự ngoài bàn phím." Nút Gửi đổi màu liên tục, bấm luôn lỗi "Hệ thống đang bận, vui lòng thử lại sau 5 giây." Không bao giờ thành công. Không dùng `alert()`.
- ❓ **Are You Sure Loop** — Nút "Đóng trang web" mở vòng lặp 10 câu hỏi ("Bạn có chắc...?", "Mèo không đồng ý...", "Bấm Có để tiếp tục kẹt"). Bấm Có hay Không đều đi tiếp. Hết 10 câu vẫn không đóng.
- 🔇 **Fake Mute** — Nút 🔊 → 🔇 nhưng volume thật trong `audio.js` tăng từ 0.03 lên 0.3 (gấp 10 lần). Tắt tiếng mà to hơn.
- 🖱️ **Scroll Hijack** — Burst 6s mỗi 20-40s: chặn cuộn mặc định, 30% nhảy đến vị trí ngẫu nhiên, 70% cuộn ngược. Nhường `scrollReverser` khi nó đang cướp để tránh cuộn gấp đôi.
- 🌐 **Language Switch** — Mỗi ~30s, toàn bộ text bị dịch sang Latinh / Klingon / tiếng Việt đảo chữ, không thông báo, tự khôi phục sau 10s. Dùng `chaosState` để không đè text với Teapot Rain.

### Phase 4: Mỗi Thiết Bị Một Nỗi Đau 🎭
Nhạc trưởng `trollOrchestrator.js` đợi 5s rồi chọn kịch bản theo `osDetector.js` (`navigator.userAgent`):
- 🪟 **Windows — Màn hình cập nhật bất tử** — Overlay Windows 11 y như thật, "Đừng tắt PC", progress lên 99% rồi tụt về số ngẫu nhiên, không bao giờ 100%. **Thoát:** Esc sau 10s (hiện nút Thoát + hint) hoặc tự biến mất sau 60s.
- 🤖 **Android — Pin nổ + Rung** — Popup "Pin nhiễm virus, quá nhiệt, hủy trong 5s", rung nhẹ 200ms khi hiện. Bấm Đóng → rung mạnh `[500,200,500,200,500]`, nút thành "KHÔNG THỂ ĐÓNG!", popup tự biến mất sau 3s. Đếm ngược 5s cũng tự biến mất. `navigator.vibrate` không hỗ trợ thì bỏ qua an toàn.
- 🍎 **iOS — iCloud đầy + Camera chụp lén** — Thông báo iCloud giả (blur, bo tròn) + chấm xanh nhấp nháy ở góc (chỉ là div + CSS, **không truy cập camera thật**). Tự biến mất sau 8s.
- ❓ **Unknown (Linux/macOS...)** — Không troll theo OS.

**Test OS khác mà không cần đổi máy:** thêm `?forceOS=windows | android | ios` vào URL. Ví dụ: `http://localhost:8000/?forceOS=android`

> ⚠️ Troll có tâm: không khóa cứng user, không `alert()`. Mọi module Phase 4 đều có cơ chế tự thoát.

### Phase 4.1: Thiết bị của bạn đã nhiễm virus! 🦠
Orchestrator chạy thêm đợt 2 ở **14s** (sườn gốc đề xuất 8s, nhưng Phase 4 Android sống tới ~10s và iOS tới ~13s — chạy ở 8s sẽ đè 2 popup lên nhau, nên dời sang 14s):
- 🤖 **Android — "79 con virus"** — Popup scareware + overlay nhấp nháy đỏ mờ. Thanh quét giả lên >95% rồi tụt về số ngẫu nhiên, không bao giờ 100%. "SỬA NGAY" → toast "Không thể kết nối đến máy chủ". "Để sau" → toast "Bạn không thể bỏ qua...", bấm 3 lần thì đóng thật. Nút ✕ mở khóa sau 10s, tự đóng sau 30s.
- 🍎 **iOS — "44 con virus" + 40.8% hư hại** — Giả mạo "Apple Security", thanh dung lượng giả có mục **🦠 Virus** (15% đỏ). "Xóa virus ngay" → toast "Đang kết nối với App Store...". "Để sau" → toast cảnh báo, bấm 3 lần thì đóng. Nút ✕ mở khóa sau 10s, tự đóng sau 25s.
- ⚠️ **Sửa so với sườn gốc:** Không dùng `alert()` cho nút "Để sau" (dùng toast, đúng quy tắc Phase 4). Flicker Android chậm xuống 0.35s alternate (~1.4Hz, dưới 3Hz) thay vì 0.15s (~3.3Hz). CSS tách sang `css/virus.css`, không inject `<style>` động, không inline `cssText`. Không tải file, không chuyển hướng ra trang lạ.

### Phase 5: Âm thanh troll + Địa ngục xác minh 🔊
- 🔊 **Phase 5.1 — Troll Sound** — Nút "🔊 Bấm để nghe thông báo quan trọng" hiện sau 3s. Bấm → phát `assets/troll.mp3` (file 8.6s do bạn gửi, `1.mp3` → `assets/troll.mp3`) với `loop = true`, lặp vô hạn, nút lớn ẩn đi. **Thoát:** nút `x` cực nhỏ góc dưới phải, sau 20s to lên thành nút đỏ "TẮT ÂM THANH". Dùng click để mở khóa autoplay theo đúng chính sách trình duyệt.
- 🍪 **Phase 5.2 — Cookie Hell** — 4 lớp liên tiếp: Thiết yếu → Phân tích → Void Telemetry → Final Form Data Collection. Chấp nhận hay Từ chối đều đi tiếp. Xong 4 lớp → "🎉 Bạn đã sống sót... (Lần này thôi)". Nút ✕ sau 15s, tự đóng sau 90s.
- 🐶 **Phase 5.2 — Impossible Age Verify** — Chọn linh vật (Chó ×7, Mèo lẻ ×15 / chẵn ×8, Rùa ×π×4, Voi cơ số 8 ×3) + nhập tuổi. Module tính tuổi linh vật rồi vẫn báo sai ngẫu nhiên. Nút ✕ sau 15s, tự đóng sau 90s.
- 📜 **Phase 5.2 — ToS Nightmare** — 30 điều khoản đầy đủ (sườn gốc chỉ có 4 + "..."), tải dần 300ms/điều, checkbox + nút Chấp nhận chỉ enable sau khi tải hết + tick. Bấm Chấp nhận → checkbox tự bỏ chọn, thêm "Điều 47.x" mới, cuộn về đầu, không bao giờ xong. Nút ✕ sau 15s, tự đóng sau 120s.
- 🧩 **Điều phối:** `phase5Orchestrator.js` chạy theo chuỗi thay vì 4 `setTimeout` cố định như sườn gốc (3s/10s/20s/30s sẽ đè 2-3 popup lên nhau): trollSound (3s) → cookieHell (10s) → xong đợi 3s → ageVerify → đóng đợi 3s → ToS.

> ⚠️ Troll có tâm: mọi popup Phase 5 đều có nút ✕ sau 15s + tự đóng sau 90-120s. Thay `assets/troll.mp3` bằng file khác nếu muốn đổi tiếng troll.

### Phase 6: Music Prompt + Tailwind + GitHub Pages 🎵
- 🎵 **Music Prompt** — Modal "Bạn có muốn mở nhạc không?" hiện sau 6s. Mobile = bottom sheet trượt từ dưới lên (`items-end`), desktop = dialog giữa màn hình (`sm:items-center`). 3 nút confirmshaming:
  - "Có, phát nhạc cho tôi!" (xanh, lớn) → phát nhạc.
  - "Để sau, tôi không muốn nghe nhạc" (vàng, trung bình) → **cũng phát nhạc** (label như từ chối, hành vi là đồng ý).
  - "Không, tôi thích im lặng" (xám, nhỏ, dưới cùng) → từ chối THẬT, đóng, không phát nhạc.
  - Click backdrop không đóng (ép chọn 1 trong 3). **Thoát:** Esc = từ chối thật, tự đóng sau 60s.
  - Tái sử dụng `#troll-audio` nếu Phase 5 đã tạo, tránh 2 audio cùng phát thành echo. Nút bấm trong sự kiện click nên `play()` hợp lệ theo chính sách autoplay.
- 🎨 **Tailwind Play CDN** — `<script src="https://cdn.tailwindcss.com"></script>` trong `<head>`, JIT trên trình duyệt, không cần build. Chỉ dùng cho musicPrompt mới, CSS cũ giữ nguyên.
  - **Xung đột đã fix:** `reset.css` đặt `box-sizing: content-box !important` toàn cục, Tailwind giả định `border-box` → modal sẽ vỡ layout. `css/phase6.css` khôi phục `border-box !important` riêng trong `#music-prompt-overlay`.
  - **Fallback:** `css/phase6.css` định nghĩa lại cùng layout bằng ID selector, nên nếu CDN offline / bị chặn, modal vẫn hiển thị đúng.
- 🚀 **Chuẩn bị deploy GitHub Pages** — Xem mục "Deploy GitHub Pages" bên dưới. Tóm tắt: mọi đường dẫn đã là tương đối (audit: 0 đường dẫn tuyệt đối), audio dùng `import.meta.url` (`new URL('../../assets/troll.mp3', import.meta.url).href` từ `js/modules/`), không dùng JSX (chỉ HTML/JS thuần, MIME đúng), có file `.nojekyll` trống để tắt Jekyll.

### Phase 7: Trói Buộc Người Dùng & Nỗi Sợ Hệ Điều Hành 😈
**Bước 1 — Sửa 2 lỗi cũ:**
- 🍪 **Cookie trôi:** `#cookie` giờ `position: fixed !important; bottom/left/right: 0 !important; width: 100% !important; z-index: 999999 !important`. Trước đây z-index 9999 thấp hơn popup (99999) / trail (999999) nên banner bị đè, trông như trôi. **Bug kèm:** `rejectCookie()` cũ dùng `innerHTML = ...` xóa sạch nút, banner mở lại sau 6s không còn nút nào. Giờ dùng thẻ `#cookie-reject-msg` riêng, nút còn nguyên. Bấm "từ chối" → hiện "Không thể từ chối. Đã chấp nhận thay bạn." → sau 2s tự đóng.
- 💙 **BSOD mất chữ:** `#fakeCrash` ép `fixed !important` + `100vw/100vh`. Khi BSOD hiện, khóa cuộn (`overflow: hidden`), khi tắt trả lại giá trị cũ. CSS trong `components.css`, không dùng `cssText` như sườn gốc.
**Bước 2 — Logo Nexyroth:**
- ©️ **Footer Nexyroth** góc dưới phải: SVG vòng tròn hồng + chữ **N** cyan xoay chậm (`animate-spin-slow`, `@keyframes spin-slow` trong `chaos.css`), "Bản quyền thuộc về **Nexyroth** (và Mèo)". `pointer-events: none` để không chặn click. Fallback CSS trong `phase7.css`.
**Bước 3 — 3 tính năng mới:**
- 👻 **Ghost Cursor** (chỉ PC, `pointer: fine` mới bật): con trỏ ma mũi tên đỏ đi theo chuột thật, trễ 0.4s (CSS `transition: left/top 0.4s`, không flood `setTimeout` như sườn gốc), lệch +15px. SVG inline thay `assets/ghost-cursor.png` (file không tồn tại → 404).
- 🔊 **Volume Troll** (sau 18s): popup góc phải "Âm lượng quá nhỏ! Thiết bị đang ở mức 1%. BẤM ĐỂ SỬA NGAY". Bấm → **phát `troll.mp3` ở 100%** (tái sử dụng `#troll-audio` nếu có, tránh echo). Thay `alert()` bằng toast. **Thoát:** ✕ / Esc / tự đóng 15s.
- 🦠 **Virus Scare Pro** (sau 30s, đợi không còn modal khác): overlay toàn màn hình theo OS — PC: virus xanh lá/đỏ + "Ổ C: nhiễm 99 virus", Android: pin bốc khói + "44 virus, pin quá nhiệt", iOS: táo cắn dở bị sâu + "hư hại 40.8%". Hình virus vẽ bằng **SVG inline** thay 3 file PNG không tồn tại (`virus-pc/android/ios.png`). Nút "QUÉT/SỬA/KHÔI PHỤC" → toast "Hệ thống đang bảo trì từ năm 2011..." rồi đóng sau 1.5s. **Thoát:** ✕ / Esc / tự đóng 10s, khóa + trả lại cuộn.
- 🧩 **Điều phối:** `phase7Orchestrator.js` — ghostCursor ngay, volumeTroll 18s, virusScarePro 30s + đợi hết modal (tối đa 30s).

> ⚠️ Troll có tâm: mọi popup Phase 7 đều có ✕ / Esc / tự đóng. Không `alert()`, không `cssText`, không file ảnh không tồn tại.

## Deploy GitHub Pages

```bash
# 1. Push toàn bộ thư mục này lên repo GitHub (giữ nguyên cấu trúc)
# 2. Vào repo → Settings → Pages
# 3. Source: Deploy from a branch, Branch: main, Folder: / (root)
# 4. Save → URL dạng https://<username>.github.io/<repo>/
```

**Kiểm tra sau deploy:**
- Trang chủ load được không.
- DevTools → Console: không lỗi 404 / MIME type.
- Network tab: `troll.mp3` tải đúng (200, audio/mpeg), `js/main.js` đúng MIME `application/javascript`.
- Thử `?forceOS=android` để kiểm tra troll theo OS trên điện thoại.

**Vì sao đường dẫn tương đối quan trọng:** GitHub Pages project site phục vụ tại `https://username.github.io/repo-name/`. Nếu dùng `/js/main.js`, trình duyệt sẽ tìm ở `https://username.github.io/js/main.js` (sai). Dự án này dùng `js/main.js`, `css/...`, `assets/...` và `import.meta.url` nên tự resolve đúng ở mọi subpath (GitHub Pages, Netlify, Vercel).

## Cấu trúc

```
├── index.html
├── css/
│   ├── reset.css        (CSS reset + tội lỗi content-box cố ý)
│   ├── base.css         (biến màu chói lóa, typography)
│   ├── layout.css       (khung, table, các vùng chính)
│   ├── components.css   (nút, input, captcha, popup, cookie, chaser, chatbot...)
│   ├── chaos.css        (animations, nhấp nháy, trail, glitch)
│   ├── memes.css        (CSS cho 8 meme đợt 2: login, dialog, teapot, bug, cow, update...)
│   ├── despair.css      (CSS Phase 3: impossibleForm, areYouSureLoop, fakeMute)
│   ├── device.css       (CSS Phase 4: Windows update, Android popup, iOS noti + camera dot)
│   ├── virus.css        (CSS Phase 4.1: Android flicker + virus popup, iOS virus dialog + storage bar)
│   ├── phase5.css       (CSS Phase 5: trollSound, cookieHell, ageVerify, tosNightmare)
│   └── phase6.css       (CSS Phase 6: musicPrompt fallback + fix box-sizing cho Tailwind)
├── .nojekyll             (file rỗng — tắt Jekyll trên GitHub Pages)
├── assets/
│   └── troll.mp3        (file âm thanh troll 8.6s do bạn gửi — 1.mp3)
├── js/
│   ├── main.js          (điểm khởi chạy, chỉ import + init)
│   ├── modules/         (mỗi tính năng troll = 1 module, export init())
│   └── utils/           (random.js, dom.js — hàm thuần, chaosState.js — cờ chống đè text/cuộn)
└── README.md
```

## Thêm tính năng troll mới

1. Tạo file mới trong `js/modules/ten-troll.js`, export `init()`.
2. Thêm 1 dòng `{ name: 'tenTroll', path: './modules/ten-troll.js' }` vào `MODULES` trong `js/main.js`.
3. (Tùy chọn) Thêm CSS vào `css/components.css` + HTML vào `index.html`.

Không biến toàn cục bừa bãi. Không inline `onclick`. Comment giải thích **tại sao** troll lại viết như vậy.

**Quy tắc import (rút ra từ bug 2026-10-19):** File trong `js/modules/` import file cùng thư mục bằng `'./ten-file.js'`, KHÔNG phải `'./modules/ten-file.js'`. Trước đây `trollOrchestrator.js` và `phase5Orchestrator.js` import sai `'./modules/...'` → trình duyệt tìm ở `js/modules/modules/...` (không tồn tại) → 9 file 404 → vì `main.js` dùng import tĩnh nên cả module graph fail, trang đứng hình, không ấn được gì. Đã sửa thành dynamic `import()` + `try/catch` từng module trong `main.js` và 2 orchestrator, để 1 module lỗi chỉ skip module đó. Kiểm tra mọi import resolve đúng bằng script trong mục "Kiểm tra" (đã thêm vào quy trình verify, không chỉ `node --check`).

## Kiểm tra

```bash
# 1. Syntax
for f in js/main.js js/utils/*.js js/modules/*.js; do node --check "$f"; done
# 2. Mọi import phải resolve ra file thật (bắt bug sai đường dẫn — node --check không bắt được)
#    (chạy script kiểm tra import, xem lịch sử: 85 import, 0 broken sau fix 2026-10-19)
# 3. Chạy server rồi mở trình duyệt thật, kiểm tra Console không còn 404
cd trang-web-binh-thuong && python3 -m http.server 8000
# 4. Trong Console: window.__trollLoadErrors phải là [] (mảng rỗng = mọi module load được)
```

## Ghi chú

> Mã nguồn được cấu trúc tốt một cách đáng ngờ.

Đừng sửa `box-sizing: content-box !important` trong `reset.css`. Đó là feature, không phải bug.
