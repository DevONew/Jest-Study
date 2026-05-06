// apiClient.test.js
const { fetchData } = require("./apiClient");
const axios = require("axios");
const { error } = require("./logger");

// 모듈 전체 함수를 jest.fn으로 교체 하는 함수
jest.mock("axios");

describe("apiClient.js 테스트", () => {
  let callback;

  beforeEach(() => {
    callback = jest.fn();

    axios.get.mockResolvedValue({
      data: {
        id: 1,
        name: "김철수",
        address: {
          street: "테스트 거리",
          suite: "테스트 호수",
          city: "서울",
        },
      },
    });
  });

  test("API 호출 후 데이터 포맷이 올바르게 되는지 확인", async () => {
    // Arrange
    const url = "https://api.example.com/user/1";

    // Act
    const result = await fetchData(url);

    // Assert
    expect(result).toEqual({
      userId: 1,
      formattedName: "김철수",
      address: "테스트 거리 테스트 호수 서울",
    });
  });

  test("API 호출 후 데이터 포맷이 올바르게 되는지 확인", async () => {

        const url = "https://api.example.com/user/1";

        const result = await fetchData(url);

        expect(result).toEqual({
        userId: 1,
        formattedName: "김철수",
        address: "테스트 거리 테스트 호수 서울",
        });
  });

  test("callback 함수가 제공되면 호출되는지 확인", async () => {
        // Arrange    // 여기서도 URL을 자유롭게 수정 가능
        const url = "https://api.example.com/user/1";
        // const callback = jest.fn();

        // Act
        await fetchData(url, callback);

        // Assert
        // 가짜 함수인 callback이 호출되었는지 확인
        expect(callback).toHaveBeenCalled();
  });

  test("callback 함수가 포멧된 데이터를 인자로 가지고 호출되는지 확인", async () => {
        // Arrange
        const url = "https://api.example.com/user/1";
        // const callback = jest.fn();

        // Act
        await fetchData(url, callback);

        // Assert
        // toHaveBeenCalled는 호출 여부만 확인
        // toHaveBeenCalledWith는 호출된 인자를 확인
        expect(callback).toHaveBeenCalledWith({
        userId: 1,
        formattedName: "김철수",
        address: "테스트 거리 테스트 호수 서울",
        });
  });

  test("callback 함수가 한 번 호출되는지 확인", async () => {
        // Arrange
        const url = "https://api.example.com/user/1";
        // const callback = jest.fn();

        // Act
        await fetchData(url, callback);

        // Assert
        expect(callback).toHaveBeenCalledTimes(1);
  });

  test("callback이 제공되지 않은 경우 callback 함수가 호출되지 않는지 확인", async () => {
        // Arrange
        const url = "https://api.example.com/user/1";
        // const callback = jest.fn();

        // Act
        // callback 함수 전달 X
        await fetchData(url);

        // Assert
        // 0번 호출되었는지 확인
        expect(callback).toHaveBeenCalledTimes(0);
        // 또는 호출이 되지 않았는지 확인
        expect(callback).not.toHaveBeenCalled();
  });

  test("API 호출이 실패한 경우 테스트", async () => {
        const url = "http://example.com/test";
        const errorMessage = "API 호출 실패";

        axios.get.mockRejectedValue(new Error(errorMessage));

        try {
            await fetchData(url);

            expect(true).toBe(false);
        } catch (error) {
            expect(error.message).toBe(errorMessage);
        }
  })

      test("API 호출이 실패한 경우 테스트", async () => {
            // Arrange
            expect.assertions(2); // 총 2개의 assertion이 실행될 것임을 명시
            const url = "http://example.com/test";
            const errorMessage = "API 호출 실패";
            // 이 부분이 없으면 expect 실행이 안되므로 에러 테스트 실패 
            axios.get.mockRejectedValue(new Error(errorMessage));

            // console.error를 모킹
            const consoleErrorSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});
            // Act & Assert
            try {
            await fetchData(url);
            // 이 라인은 실행되지 않아야 함
            // expect(true).toBe(false); // -> 삭제
            } catch (error) {
            expect(error.message).toBe(errorMessage);
            // console.error가 호출되었는지 확인
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                `API 호출 중 오류 발생: ${errorMessage}`
            );
            }
    });

  // 프로미스 체이닝 용
    test("API 호출 후 데이터 포맷이 올바르게 되는지 확인", async () => {

        const url = "https://api.example.com/user/1";

        // const result = await fetchData(url);

        // expect(result).toEqual({
        // userId: 1,
        // formattedName: "김철수",
        // address: "테스트 거리 테스트 호수 서울",
        // });

        return fetchData(url).then((result) => {
            expect(result).toEqual({
                userId: 1,
                formattedName: "김철수",
                address: "테스트 거리 테스트 호수 서울",
            })
        })
    });

    // 또는 
    test("API 호출 후 데이터 포맷이 올바르게 되는지 확인", async () => {
        const url = "https://api.example.com/user/1";

        return expect(fetchData(url)).resolves.toEqual({
            userId: 1,
            formattedName: "김철수",
            address: "테스트 거리 테스트 호수 서울",
        });
    });

    //프로미스 체이닝 실패 
    test("API호출이 실패한 경우 테스트", async () => {
        const url = "https://api.example.com/user/1";
        const errorMessage = "API 호출 실패";

        return fetchData(url).catch(error => {
            expect(error.message).toBe(errorMessage);
        })
    })

    //또는
    test("API호출이 실패한 경우 테스트", async () => {
        const url = "https://api.example.com/user/1";
        const errorMessage = "API 호출 실패";
        axios.get.mockRejectedValue(new Error(errorMessage));

        return expect(fetchData(url)).rejects.toThrow(errorMessage);
    })


});





// describe("apiClient.js 테스트", () => {
//   test("API 호출 후 데이터 포맷이 올바르게 되는지 확인", async () => {

//     // url 전에 반드시 먼저 작성 할 것. 
//     // global 객체는 node 환경에서의 최상위 객체 
//     // Node 18부터 fetch가 전역으로 내장 되어서 global.fetch로 안써도 됨. 
//     //global.fetch = jest.fn(); 일경우 json이 undefined하다는 결과가 나옴
//     global.fetch = jest.fn().mockResolvedValue(
//         {
//             json: jest.fn().mockResolvedValue({
//                 id: 1, 
//                 name: "MARTIN",
//                 address: {
//                     street: "Kulas Light",
//                     suite: "Apt. 556",
//                     city: "Gwenborough",
//                 }
//             })
//         }
//     );

//     const url = "https://jsonplaceholder.typicode.com/users/1";

//     const result = await fetchData(url);

//     expect(result).toEqual({
//       userId: 1,
//       formattedName: "MARTIN",
//       address: "Kulas Light Apt. 556 Gwenborough",
//     });
//   });
// });
