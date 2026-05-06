const { fetchUserData } = require("./fetchMock");

// 1. global.fetch를 모킹하세요
// 2. 모킹된 함수가 특정 응답을 반환하도록 설정하세요
// 3. fetchUserData 함수를 호출하고 결과를 검증하세요
test('fetchUserData 함수 테스트', async () => {
    // arrange
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
            id: 1, 
            name: "MARTIN"
        })
    });
    // act
    const userData = await fetchUserData(1);
    // assert
    expect(userData).toEqual( {id: 1, name: "MARTIN" });

});