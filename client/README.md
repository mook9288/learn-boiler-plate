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
