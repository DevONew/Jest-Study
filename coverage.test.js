const {
  isPositive,
} = require("./coverage");

test("양수일 때 true를 반환한다", () => {
  expect(isPositive(5)).toBe(true); 
});