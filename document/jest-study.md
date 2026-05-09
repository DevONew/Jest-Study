# Jest Study

Jest는 Meta에서 만든 테스팅 프레임워크다. 테스트 자동화를 위한 도구. 

실무적으로 유용한 것들, 기초적인 사용법들을 정리해보았다. 

## package.json 설정

`jest -—watch` 명령어는 코드 수정 시 바로 테스트가 재실행되게 하는 명령어다. 

```json
{
  "name": "jest-simulation",
  "version": "1.0.0",
  "main": "index.js",
  **"scripts": {
    "test": "jest",
    "test:watch": "jest --watchAll"
  },**
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "jest": "^30.2.0"
  }
}

```

## module.exports 와 require

둘다 commonJS 모듈 시스템 문법이다.  
ES Modules로 치면 export/import 인데 차이점이 존재한다. 

### 1. 로딩 방식

**CommonJS - 동기(런타임에 실행)**

`const { sum } = require('./sum');`// 이 줄 실행될 때 파일 읽음

- 코드가 실행되는 그 순간 파일을 불러온다.
- 조건문 안에서도 사용이 가능하다. 

`if (condition) { const lib = require('./lib'); } `

**ES Modules — 비동기 (파싱 단계에서 처리)**

`import { sum } from './sum';`// 실행 전에 미리 분석됨

- 파일 실행 전에 의존성을 미리 파악
- 최상단에먼 쓸 수 있음

### 2. 동적 vs 정적

CommonJS는 동적으로 런타임에 결정이 된다. 따라서 이것때문에 변수로 가능하다.  
반면 ES Modules는 정적으로, 컴파일 타임에 결정이 된다. 그렇기 때문에 변수로 불가하다. 미리 분석이 가능하기 때문에 Tree Shaking이 가능해 번들 크기 최적화가 된다. (CommonJS는 런타임에 결정되기 때문에 번들러 입장에서 실행 전에는 어떤게 쓰일지 알수가 없음.)

----

**Tree Shaking** - 번들러가 import/export 분석하여 실제로 쓰이는 코드만 남기는 최적화 

**정적(static)과 동적(Dynamic)의 기준** - 런타임 전, 즉 컴파일 타임에 알수 있냐 없냐의 차이. 사용자 입력값, 외부 api 응답값, 환경변수, 조건문/변수 동적인 값을 반환하는 함수의 결과값들이 있다. 

----

## 기본 문법 


```json

const { sum } = require("./sum"); // 1.require로 파일 가져온다

test("1+2는 3이 되어야함", () => { // 2. test("",() => {})로 테스트할 내용과 함수를 인자로 넣는다
  expect(sum(1, 2)).toBe(3); 
  // 3. expect(recieved).matcher() // expect함수와 그안에 실제 나온 값을 넣고(함수로 넣었으나 변수로 빼도 됨) matcher함수와 그 안에 기대값을 넣는다. 
});

```
expect에 넣은 값은 실제 함수가 실행 되었을때의 값, 테스트 해야될 값이고 matcher안 값은 말그대로 비교해야할 값 기대하는 값, 이래야하는 예상값이다. 

