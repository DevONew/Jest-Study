const { validatePassword } = require("./validate");

test("비밀번호가 8자 이상인 경우 true가 반환되는지", () => {
    expect(validatePassword("password123")).toBe(true);
})


test("비밀번호가 8자 미만인 경우 false가 반환되는지", () => {
    expect(validatePassword("1212")).toBe(false);
})