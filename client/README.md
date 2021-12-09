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
