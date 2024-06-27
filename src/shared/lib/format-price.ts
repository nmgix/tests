export function formatPrice(num: number) {
  let number = String(num);
  if (number.length <= 4) return number;

  const result = [];
  while (number.length > 3) {
    result.unshift(number.slice(-3));
    number = number.slice(0, -3);
  }
  result.unshift(number);

  return result.join(" ");
}
