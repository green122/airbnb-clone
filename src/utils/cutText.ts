export function cutText(text: string, limit = 170) {
  return text.slice(0, limit).concat('...');
}
