const { calculator } = require("./math");



// 1. calculator.add를 jest.fn()으로 모킹하세요
// 2. 모킹된 함수를 호출해보고, 호출되었는지 검증하세요
// 3. 호출 인자를 검증하세요
test("calculator.add 함수 모킹 테스트", () => {
    //이 함수가 올바르게 호출 되었는지 알기 위해 하는 테스트
    calculator.add = jest.fn();

    calculator.add(1, 2);
    
    expect(calculator.add).toHaveBeenCalled();
    expect(calculator.add).toHaveBeenCalledWith(1, 2);
});

// 1. calculator.subtract가 1을 반환하도록 jest.fn()으로 모킹하세요
// 2. 모킹된 함수를 호출하고, 호출 여부를 검증하세요. -> subtract 함수에는 5와 3을 인자로 전달하세요.
// 3. calculator.subtract 함수가 1을 반환하는지 검증하세요. -> 5 - 3은 2지만 모킹으로 인해 1이 반환됩니다.
test("calculator.subtract 함수 모킹 테스트", () => {
    // 리턴값을 1로 고정
    calculator.subtract = jest.fn().mockReturnValue(1);

    calculator.subtract(5, 3);

    expect(calculator.subtract).toHaveBeenCalled();
    expect(calculator.subtract(5, 3)).toBe(1);
});

// 1. calculator.multiply를 spyOn으로 모킹하세요
// 2. 모킹된 함수가 호출되었는지 검증하세요 -> 이때 첫 번째 인자는 2, 두 번째 인자는 3을 넣어주세요.
// 3. 호출 결과가 올바르게 계산되는지 검증하세요 (2 * 3 = 6)
test("calculator.multiply 함수 모킹 테스트", () => {

  // 로직 살리기 위해 spyOn jest.fn()을 쓸경우 새로운 빈함수가 된다. 
  const multiplyValue = jest.spyOn(calculator, "multiply");

  multiplyValue(2, 3);

  expect(multiplyValue(2, 3)).toBe(6);

});