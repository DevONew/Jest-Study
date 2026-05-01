// inventory.test.js

const { addFruit, removeFruit } = require("./inventory");

const fruits = ["사과", "바나나", "오렌지"];

test("포도 추가 됐는지", () => {
    expect(addFruit(fruits, "포도")).toContain("포도");
});

test("바나나 제거 됐는지", () => {
    expect(removeFruit(fruits, "바나나")).not.toContain("바나나");
});

test("길이 4인지", () => {
    expect(addFruit(fruits, "포도")).toHaveLength(4);
});

test("바나나를 제거하면 나머지 과일만 남아야 함", () => {
  const result = removeFruit(fruits, "바나나");
  expect(result).toEqual(["사과", "오렌지"]);
});