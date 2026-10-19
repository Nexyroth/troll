// utils/chaosState.js — Trạng thái chia sẻ giữa các module troll thay text / cuộn
// Tránh 2 module cùng lúc thay text (teapot vs languageSwitch vs textMutation)
// rồi khôi phục đè lên nhau, hoặc 2 module cùng cướp wheel gây cuộn gấp đôi.
// Không chứa logic troll, chỉ là cờ trạng thái.

let translating = false;
let raining = false;

export function isTranslating() { return translating; }
export function setTranslating(v) { translating = v; }

export function isRaining() { return raining; }
export function setRaining(v) { raining = v; }
