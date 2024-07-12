export function calculateDiscount(originalPrice: number, discountedPrice: number) {
  const discountPercent = ((discountedPrice - originalPrice) / discountedPrice) * 100;
  return Math.round(discountPercent / 10) * 10;
}
