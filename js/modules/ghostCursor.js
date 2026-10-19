// js/modules/ghostCursor.js — "Ai đang điều khiển máy tôi?" (Phase 7, chỉ PC)
// Tạo 1 con trỏ ma (mũi tên đỏ) đi theo con trỏ thật nhưng bị trễ 0.4s.
// Người dùng sẽ hoảng hồn khi thấy có "ai đó" đang di chuyển chuột cùng mình.
//
// Sửa so với sườn gốc:
// - Sườn gốc dùng assets/ghost-cursor.png (file KHÔNG tồn tại -> 404 + ảnh vỡ).
//   Ở đây dùng SVG inline (mũi tên đỏ vẽ bằng code) — không cần file ngoài.
// - Sườn gốc setTimeout 400ms cho MỖI mousemove -> flood timeout khi rê chuột nhanh.
//   Ở đây JS chỉ set left/top, CSS transition: left/top 0.4s tự tạo độ trễ mượt.
// - Chỉ bật khi (pointer: fine) — tức có chuột thật (PC). Mobile / cảm ứng thì skip,
//   vì trên mobile không có con trỏ để "ma" đi theo.
// CSS trong css/phase7.css, không inline cssText.

let started = false;

export function init() {
  if (started) return;
  started = true;
  // Chỉ PC có chuột thật mới có ma
  if (typeof window.matchMedia === 'function' && !window.matchMedia('(pointer: fine)').matches) {
    return;
  }
  if (document.getElementById('ghost-cursor')) return;

  const ghost = document.createElement('div');
  ghost.id = 'ghost-cursor';
  ghost.setAttribute('aria-hidden', 'true');
  // Mũi tên con trỏ màu đỏ, vẽ bằng SVG inline
  ghost.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 2 L4 20 L9 15 L11 22 L13 21 L11 14 L18 14 Z" fill="#ff0000" stroke="#fff" stroke-width="1"/>
    </svg>
  `;
  document.body.appendChild(ghost);

  document.addEventListener('mousemove', (e) => {
    // Lệch một chút (+15px) như có ai đó bắt chước không hoàn hảo
    ghost.style.left = (e.clientX + 15) + 'px';
    ghost.style.top = (e.clientY + 15) + 'px';
    ghost.style.opacity = '0.7';
  });

  document.addEventListener('mouseleave', () => {
    ghost.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    ghost.style.opacity = '0.7';
  });
}
