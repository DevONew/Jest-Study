const { validateEmail } = require("./validateE");

test("유효한 이메일 입력 시 true 반환하는지", () => {
    expect(validateEmail("test@example.com")).toBeTruthy();
})

test("유효하지 않은 메일 입력 시 falsy 반환하는지", () => {
    expect(validateEmail("testexample.com")).toBeFalsy();
})

test("유효한 이메일 입력 시 true 반환하는지", () => {
    expect(validateEmail("testxample.com")).not.toBeTruthy();
})