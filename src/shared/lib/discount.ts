export function calculateDiscount(originalPrice: number, discountedPrice: number) {
  let discountPercent = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return (discountPercent = Math.round(discountPercent * 10) / 10);
}
