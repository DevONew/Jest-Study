const { fetchUserData } = require("./fetchMock");

// 1. fetch API 모킹하기
// 2. fetchUserData 호출
// 3. 결과값 검증하기
test("사용자가 데이터를 성공적으로 가져오는 경우 모킹", async () => {
  const mockUserData = { id: 1, name: "철수", email: "abc@naver.com" };

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockUserData),
  })

  const userData = await fetchUserData(1);

});

// 1. fetch가 거부된 Promise를 반환하도록 모킹
// 2. 최소 1개의 assertion이 필요
// 3. fetchUserData 호출 및 에러 검증
// 4. 에러 메시지 검증 
test("네트워크 오류 발생 시 에러 처리", async () => {

  global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));

  expect.assertions(1);
  try {
    await fetchUserData(1);
  } catch (error) {

    expect(error.message).toBe("Network Error");
  }
});


test("사용자가 데이터를 성공적으로 가져오는 경우 모킹", async () => {
  const mockUserData = { id: 1, name: "철수", email: "abc@naver.com" };
  // 1. fetch API 모킹하기
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockUserData),
  });

//   // 2. fetchUserData 호출
//   const userData = await fetchUserData(1);

//   // 3. 결과 검증하기
//   expect(userData).toEqual(mockUserData);
  // 2. Promise 방식으로 테스트
  return fetchUserData(1).then((userData) => {
    expect(userData).toEqual(mockUserData);
  });
  
});

test("네트워크 오류 발생 시 에러 처리", async () => {
  // 1. fetch가 거부된 Promise를 반환하도록 모킹
  global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));
  // 2. 최소 1개의 assertion이 필요
  expect.assertions(1);
  // 3. fetchUserData 호출 및 에러 검증
//   try {
//     await fetchUserData(1);
//   } catch (error) {
//     // 4. 에러 메시지 검증 
//     expect(error.message).toBe("Network Error");
//   }
// 3. Promise 방식으로 에러 처리 테스트
  return fetchUserData(1).catch((error) => {
    expect(error.message).toBe("Network Error");
  });
});

test("사용자 데이터를 성공적으로 가져오는 경우 - resolves 방식", () => {
  const mockUserData = { id: 1, name: "철수", email: "abc@naver.com" };

  // 1. fetch API 모킹하기
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockUserData),
  });

  // 2. resolves 방식으로 테스트
  return expect(fetchUserData(1)).resolves.toEqual(mockUserData);
});

test("네트워크 오류 발생 시 에러 처리 - rejects 방식", () => {
  // 1. fetch가 거부된 Promise를 반환하도록 모킹
  global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));

  // 2. rejects 방식으로 에러 처리 테스트
  return expect(fetchUserData(1)).rejects.toThrow("Network Error");
});

// 1. global.fetch를 모킹하세요
// 2. 모킹된 함수가 특정 응답을 반환하도록 설정하세요
// 3. fetchUserData 함수를 호출하고 결과를 검증하세요
// test('fetchUserData 함수 테스트', async () => {
//     // arrange
//     global.fetch = jest.fn().mockResolvedValue({
//         json: jest.fn().mockResolvedValue({
//             id: 1, 
//             name: "MARTIN"
//         })
//     });
//     // act
//     const userData = await fetchUserData(1);
//     // assert
//     expect(userData).toEqual( {id: 1, name: "MARTIN" });

// });