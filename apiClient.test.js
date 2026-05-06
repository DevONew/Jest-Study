// apiClient.test.js
const { fetchData } = require("./apiClient");

describe("apiClient.js 테스트", () => {
  test("API 호출 후 데이터 포맷이 올바르게 되는지 확인", async () => {

    // url 전에 반드시 먼저 작성 할 것. 
    // global 객체는 node 환경에서의 최상위 객체 
    // Node 18부터 fetch가 전역으로 내장 되어서 global.fetch로 안써도 됨. 
    //global.fetch = jest.fn(); 일경우 json이 undefined하다는 결과가 나옴
    global.fetch = jest.fn().mockResolvedValue(
        {
            json: jest.fn().mockResolvedValue({
                id: 1, 
                name: "MARTIN",
                address: {
                    street: "Kulas Light",
                    suite: "Apt. 556",
                    city: "Gwenborough",
                }
            })
        }
    );

    const url = "https://jsonplaceholder.typicode.com/users/1";

    const result = await fetchData(url);

    expect(result).toEqual({
      userId: 1,
      formattedName: "MARTIN",
      address: "Kulas Light Apt. 556 Gwenborough",
    });
  });
});
