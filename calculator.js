function calculateTotal(price, quantity, discount = 0) {
  return price * quantity * [1 - discount]
}


// 1. 장바구니 페이지에서 다음과 같이 작성
const cartTotal = calculateTotal(1000, 2, 0.1); // 2000원
console.log(`총 가격: ${cartTotal}원`);


// 2. 결제 페이지에서 다음과 같이 작성
const paymentTotal = calculateTotal(2000, 4); // 8000원
console.log(`총 가격: ${paymentTotal}원`);


function calculateDiscountedPrice(originalPrice, discountPercentage) {
  if (originalPrice < 0 || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error(
      "입력값이 유효하지 않습니다. 가격과 할인율은 0 이상이어야 하며, 할인율은 100 이하이어야 합니다."
    );
  }
  const discount = originalPrice * (discountPercentage / 100);
  return originalPrice - discount;
}

module.exports = { calculateDiscountedPrice, calculateTotal };

