// utils/random.js — hàm thuần, không side-effect, dễ test
// Mọi sự ngẫu nhiên gây ức chế đều đi qua đây.

/** Số nguyên ngẫu nhiên trong [min, max] (bao gồm cả 2 đầu) */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Số thực ngẫu nhiên trong [min, max) */
export function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/** Chọn 1 phần tử ngẫu nhiên trong mảng */
export function randomChoice(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

/** Trả về true với xác suất p (0..1) */
export function chance(p) {
  return Math.random() < p;
}
