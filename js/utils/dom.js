// utils/dom.js — DOM helpers thuần, tránh lặp document.getElementById khắp nơi

/** Lấy element theo id, null nếu không có */
export function el(id) {
  return document.getElementById(id);
}

/** Tạo element với class + text + attrs tùy chọn */
export function createEl(tag, { className = '', text = '', html = '', attrs = {} } = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  if (html) node.innerHTML = html;
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

/** Xóa element an toàn (không throw nếu đã bị xóa) */
export function removeEl(node) {
  if (node && node.parentNode) node.parentNode.removeChild(node);
}
