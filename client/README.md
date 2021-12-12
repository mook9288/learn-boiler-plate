# ReactJS 기초

## React ?

- Library, Made in Feacbook, Released in 2013
- Components module과 비슷하게 컴포넌트로 이뤄져 있어서 reusable이 뛰어남.
- Virtual DOM
  - vs. Real DOM
  - Virtual DOM이 업데이트되면 바뀐 부분만 Real DOM에서 바꿔줌

## Create React App으로 리액트 시작하기

- React App을 실행하기 위해 webpack, babel 등과 같은 것을 설정해줘야 하는데 `create-react-app`으로 바로 시작할 수 있다.
  > **babel**이란 최신 자바스크립트 문법을 지원하지 않는 브라우저들을 위해서 최신 자바스크립트 문법을 구형 브라우저에서도 돌 수 있게 변환 시켜준다.
  >
  > **webpack**이란 여러개 파일을 하나의 파일로 합쳐주는 Module bundler이다.

```bash
npx create-react-app .
```

## CRA to Our Boilerplate

```
- 📂 _actions           // ...Redux를 위한 폴더들
- 📂 _reducer           // ...Redux를 위한 폴더들
- 📂 components
  - 📂 views            // ...이안에는 Page들을 넣는다
    - 📂 Sections       // ...해당페이지에 관련된 css 파일이나, component 들을 넣는다.
  - 📄 App.js
  - 📄 Config.js
- 📂 hoc                // ...Higher Order Component
- 📂 utils              // ...여러 군데에서 쓰일 수 있는 것들을 어디서든 쓸 수 있게 이곳에 넣는다.
```

## React Router Dom

- 페이지 이동할때 React Router Dom을 사용

```bash
npm install react-route-dom --save
```

## Data Request Response Flow and Axios

- Client에서 Server로 요청(Request)을 보냄
- Server는 DB에서 요청 받은 내용을 찾음
- DB에서 찾은 내용에 대한 성공여부 결과와 함께 값을 Client에게 응답(Response)해줌
- 요청을 보낼때는 AXIOS를 사용함(jQuery 사용 시, Ajax같은거)

  ```bash
  npm install axios --save
  ```

## CORS 이슈와 해결 방법(Proxy)

```js
// src/components/view/LandingPage/LandingPage.js
axios.get('/api/hello').then((response) => console.log(response.data));
```

Client와 Server의 포트가 달라 404 error가 발생한다.

```js
// src/components/view/LandingPage/LandingPage.js
axios
  .get('http://localhost:5000/api/hello')
  .then((response) => console.log(response.data));
```

url 넣어줬으나 error가 발생한다.
두개의 다른 포트를 가지고 있는 서버에서는 아무 설정없이 Request를 보낼 수 없다.
CORS(Cross-Origin Resource Sharing) 정책이라는 보안 이슈 정책 때문이다.

해결 방법으로는 여러가지 방법이 있는데 그 중에 Proxy를 사용하는 방법으로 해결하려고 한다.

```bash
npm install http-proxy-middleware --save
```

#### src/setupProxy.js 파일 생성

```js
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    proxy({
      // ...
    })
  );
};
```

http-proxy-middleware가 버전이 업데이트가 되면서 사용법이 아래처럼 바뀌었다.

```js
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // ...
    })
  );
};
```

### Proxy Server

Client가 Server에 요청을 보내면 Server는 Client에게 응답을 보내준다.
Client가 Proxy Server에 IP를 보냈을 때, Proxy Server에서 아이피를 임의로 바꿔버릴 수 있다. 그래서 인터넷에서는 접근하는 사람의 IP를 모를 수 있게 하기도 하고 보내는 데이터도 임의로 바꿀 수 있다.
그 외 방화벽 기능, 웹 필터 기능, 캐쉬데이터/공유데이터 제공 기능을 할 수 있다.

#### Proxy Server를 사용하는 이유

- 회사에서 직원들이나 지안에서 아이들의 인터넷 사용 제어
- 캐쉬를 이용해 더 빠른 인터넷 이용 제공
- 더 나은 보안 제공
- 이용 제한된 사이트 접근 가능

## Concurrently를 이용해서 프론트/백 서버 한번에 켜기

```bash
npm install concurrently --save
```

#### package.json의 script 추가

```json
{
  // ...
  "scripts": {
    // ...
    "dev": "concurrently \"npm run devStart\" \"npm run start --prefix client\""
  }
  // ...
}
```

## Redux

- 상태 관리 라이브러리

#### Props

- properties 줄임말
- 구성 요소들이 서로 대화하는 방식
- 부모 컴포넌트에서 자식 컴포넌트로 보내는 방식
- 자식 컴포넌트로 내려준 props는 불변의 값, 값을 변경하려면 부모 컴포넌트에서 내부 상태를 바꿈

#### State

- 부모 컨포넌트에서 자식 컨포넌트로 data를 보내는게 아닌 그 컴포넌트안에서 데이터를 교환/전달
- state는 변화가 가능한 값
- state가 변화면 re-rander됨

### Redux가 있고 없고의 차이

Redux가 없으면 정보를 주고 받을 때, 순서대로 거쳐가야만 주고 받을 수 있다.
Redux를 사용하면 직접 접근하여 정보를 주고 받을 수 있다.

### Redux 데이터 Flow (strict unidirectional data flow)

components에서 dispatch를 이용하여 action, reducer, store를 거쳐 다시 component로 돌아오는 방식이며, 한 방향으로 흐른다.

- **Action**: 무엇이 일어났는지 설명하는 객체로 이루어져 있다.
- **Reducer**: action을 거쳐 state가 변경되는 것을 설명한다. 이전 state와 action object를 받은 후에 next state를 반환한다.
- **Store**: 어플리케이션의 state을 감싸주는 역할을 한다. Store는 여러 메소드들을 가지고 있어 이를 이용하여 state를 관리할 수 있다.

### Redux 설정하기

#### install 해야할 Dependency

```bash
npm install redux react-redux redux-promise redux-thunk --save
```

- **redux**:
- **react-redux**:
- **redux-promise와 redux-thunk**:

##### redux-promise와 redux-thunk

Redux store 안에 모든 state를 관리하는데 state를 변경하고 싶으면 dispatch를 이용해서 action으로 변경을 시킬 수 있다. action은 객체 형식이여야 store가 받을 수 있다.

store에서 언제나 객체형식의 액션을 받는게 아니라 promise 또는 function 형태로 받을 때도 있다. **redux-thunk은 dispatch한테 펑션을 받는 방법**을 알려준다. **redux-promise은 dispatch한테 프로미스가 왔을 때 어떻게 대처를 해야하는지** 알려준다.

redux-promise와 redux-thunk는 redux의 middleware이고, Redux를 잘 쓸 수 있게 도와주는 역할을 한다.

### React vs. React Hooks

React Component는 크게 2가지 방법으로 사용한다.

#### Class Component

```js
import React, { Component } from 'react';
export default class Hello extends Component {
  rander() {
    return <div>Hello World!!</div>;
  }
}
```

- 제공되는 기능이 다양함
- 코드가 길어짐
- 코드가 좀 더 복잡함
- 성능이 조금 느림

#### Functional Component

```js
import React from 'react';
export default function Hello() {
  return <div>Hello World!!</div>;
}
```

- 제공되는 기능이 한정적임
- 코드가 짧아짐
- 코드가 좀 더 간단함
- 성능이 조금 빨라짐

React 16.8버전에서 Hooks이 업데이트 되면서 Functional Component에서도 LifeCycle을 사용할 수 있게 되었다.
