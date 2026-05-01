// grade.test.js
const { getGrade } = require("./grade");

test("90점 이상 A등급인지", () => {
    expect(getGrade("95")).toMatch(/A등급/);
});

test("75점 은 보통인지", () => {
    expect(getGrade("75")).toContain("보통");
});

test("null 입력시 null 반환하는지", () => {
    expect(getGrade(null)).toBeNull();
});