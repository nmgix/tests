export function calculateDiscount(originalPrice: number, discountedPrice: number) {
  const discountPercent = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discountPercent / 10) * 10;
}
