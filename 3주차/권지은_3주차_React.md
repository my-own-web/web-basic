# React

새로운 프로젝트 생성: `npx create-react-app begin-react`  
실행: `yarn start`

## 1장. 리액트 입문

* 다른 프레임워크: 자바스크립트에서 특정 값이 바뀌면 특정 DOM 속성이 바뀌도록 연결.

* React: 상태가 바뀌었을 때 처음부터 모든 걸 새로 만들어서 보여줌. 메모리 상에 있는 Virtual DOM에서 랜더링, 실제 브라우저 DOM과 비교 후 차이가 있는 곳만 바꿈.

### 1-1. 컴포넌트

* 쉽게 재사용 할 수 있는 UI 조각.
* 함수형태, 클래스 형태로 작성 가능.

#### 함수형태 컴포넌트 예시

```JavaScript
import React from 'react'; // 리액트를 불러옴

function Hello() {
  return <div>안녕하세요</div> // '안녕하세요'가 화면 위에 나타남.
}

export default Hello; // Hello라는 컴포넌트 내보냄
// XML 형식의 값 반환 -> JSX
```

> `XML(eXtensible Markup Language)`  
> 사용자 임의로 태그 만들 수 있음.  
> Markup Language의 예로는 HTML.

#### 컴포넌트 사용 예시

```JavaScript
import React from 'react';
import Hello from './Hello'; // Hello 컴포넌트를 불러옴

function App() {
  return (
    <div>
      <Hello />
    </div>
  );
}

export default App;
```

#### 브라우저에 보이는 결과

![result](https://i.imgur.com/p3fHfm5.png)  
출처: https://react.vlpt.us/basic/03-first-component.html

### 1-2. JSX

JavaScript 확장 문법. babel에 의해 JavaScript로 변환.

1) 태그 꼭 닫기  
Self Closing tag: `<br />`
  
2) 두 개 이상 태그는 하나의 태그로 감싸기.  
리액트 fragment: `<> </>`

3) JSX 내부 JS 변수  
`{변수이름}`

4) style  
객체 형태. 이름은 camelCase 형태.  
`const style = {}`  
`<div style={style}> </div>`

5) CSS class  
`className=""`
    > cf. HTML은 class

6) 주석  
   * JSX 내부: `{/* */}`
   * 열리는 태그 안 주석: `//`

### 1-3. Props

컴포넌트에 값을 전달할 때 properties(props) 사용.  
eg)
`props.children`: 컴포넌트 태그 사이에 얺은 값을 조회하고 싶을 때  
`props.name`, `props.color`

#### App.js

```JavaScript
<Wrapper> 
    <Hello name="react" color="red" /> // props.children
</Wrapper>
```

#### Hello.js

```JavaScript
function Hello(props) { // {color, name} 으로 객체 구조 분해
  return <div style={{color: props.color}}>안녕하세요 {props.name}</div>
}

// props에 값을 지정하지 않았을 때 사용.
Hello.defaultProps = {
  name: '이름없음'
}
```

#### Wrapper.js

```JavaScript
// 불러올 때는 <Wrapper />, 뭘 넘겨준다고 명시 안 함.
function Wrapper({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}
```

### 1-4. 조건부 렌더링

App.js에서  
`<Hello isSpecial={true} />`, `<Hello isSpecial />`
isSpecial props를 설정해서 Hello 컴포넌트를 사용한다.

* true는 JS값이라 중괄호 사용  
* props 이름만 작성하고 값 설정을 안 하면 true로 초기화.

Hello.js에서  
`{ props.isSpecial ? <b>*</b> : null }`  
isSpecial 값이 true라면 '*'를 화면에 나타내고  
false라면 아무것도 나타내지 않는다.  

* JAX에서 null, false, undefined를 렌더링하면 아무것도 나타나지 않음.

### 1-5. Input

사용자의 입력에 따라 input 태그 상태 관리.

```JavaScript
 const [text, setText] = useState('');

 const onChange = (e) => {
    setText(e.target.value);
    /*
    e.target: input DOM
    e.target.value: input에 입력한 값
    */
  };

  return (
    <div>
      <input onChange={onChange} value={text}  />
      {/* input 내용 업데이트하기 위해 value 값을 설정. */}
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
```

#### Input 관련 이벤트/props

`onChange`: input이 바뀌면.  
`placeholder`: input이 비어져 있을 때 보임

`onSubmit`: 엔터 눌러서 전송 시.
`preventDefault()`: 전송하면서 새로고침되는 것을 방지.

> **preventDefault**
> 브라우저 구현에 의해 처리되는 기존의 동작이 진행되지 않는다.
> 예시) a 태그 클릭시 href링크 이동 방지, submit 태그 클릭시 창 새로고침 방지
> 
#### 여러개의 input

* 각 input에 name 설정.

```JavaScript
<input name="name" placeholder="이름" onChange={onChange} value={name} />
<input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
```

* useState는 문자열이 아닌 객체 형태를 파라미터로 받음.

```JavaScript
const [inputs, setInputs] = useState({
  name: '',
  nickname: ''
});
```

* 리액트 객체를 수정할 때, 새로운 객체를 만들어야 한다. 기존 객체를 직접 수정하면 렌더링이 안 된다.

```JavaScript
  const { name, nickname } = inputs; 

  const onChange = (e) => {
    const { value, name } = e.target; 
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };  
```

### 1-6. 배열 렌더링

`map()` 사용.  

```JavaScript
<div>
  {users.map((user, index) => (
    <User user={user} key={index} />
  ))}
</div>
```

배열을 렌더링 할 때 key 값을 설정해야 효율적이다. key는 배열의 원소마다 고유한 값으로 한다. 또는 map() 콜백함수 두 번째 파라미터인 index를 key로 사용한다.

배열에 변화를 줄 때 불변성을 지켜야 한다. 즉, 새로운 배열을 만들어야 한다.

#### 배열 항목 추가

`spread`, `concat` 배열 내장 함수를 사용한다.

```JavaScript
const [users, setUsers] = useState([/* 객체 배열 */]);

const newuser={}; // 추가할 새로운 객체 원소
setUsers([...users, newuser]); // spread 사용
setUsers(users.concat(newuser)); // concat 사용
```

#### 배열 항목 제거

`filter` 배열 내장 함수를 사용한다.

```JavaScript
// 삭제 버튼 렌더링
 <button onClick={() => onRemove(user.id)}>삭제</button>

 // onRemove 함수: 
 const onRemove = id => {
   setUsers(users.filter(user => user.id != id));
   // user.id가 id가 아닌 원소만 추출해서 새로운 원소 만듦
 }
```

#### 배열 항목 수정

```JavaScript
const onToggle = id => {
  setUsers(
    users.map(user =>
      user.id === id? {...user, active: !user.active} : user
    )
  );
};

// 글자를 누르면 배열 항목 수정
<b onClick={() => onToggle(user.id)}>{user.username}</b>
```

### 1-7. Hooks

#### useState - 상태 관리

컴포넌트에서 바뀌는 값(상태) 관리

`useState(기본값)`  
배열 `[현재_상태, Setter함수]` 반환.  
`import React, { useState } from 'react';`: 리액트 패키지에서 useState 함수 불러옴.

##### 이벤트 설정

`on이벤트 이름={실행하고싶은함수}`

> <주의> `함수()` 형태로 넣으면 렌더링되는 시점에 함수 호출됨.

###### 예시: Counter.js

```JavaScript
import React from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(number + 1);
    
    /* 함수형 업데이트:
    setNumber(prevNumber => prevNumber+1)
    */
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      {/* button을 클릭할 때 onIncrease함수 실행*/}
    </div>
  );
}

export default Counter;
```

- - -

#### useRef

##### 특정 DOM 선택

###### 예시: InputSample.js

```JaVaScript
 const nameInput = useRef(); // Ref 객체를 만든다.
 const onReset = () => {
   nameInput.current.focus(); 
   // .current: 선택한 DOM
   // focus(): 포커스를 하는 DOM API
 };
```

```JavaScript
<input ref={nameInput} /> // 특정 DOM에 ref 값으로 설정한다.
<button onClick={onReset}>초기화</button>
```

##### 컴포넌트 안에 조회 및 수정 가능한 변수 관리

useRef로 관리하는 변수는 값이 바뀐다고 컴포넌트가 리렌더링 되지 않는다. 따라서 설정 후 바로 조회할 수 있다.

관리 값 예시: scroll 위치, 외부 라이브러리를 사용해서 생성된 인스턴스, `setTimeout` `setInterval`을 통해서 만들어진 id.

- - -

#### useEffect - 마운트, 언마운트, 업데이트시 할 작업 설정

`useEffect(함수, deps배열)`  
첫번째 파라미터: 함수  
두번째 파라미터: 의존값이 들어있는 deps 배열.  
반환: cleanup 함수

deps 배열이:

  1. `[]`: 컴포넌트가 처음 나타날때에만 함수 호출. 사라질 때 cleanup 함수 호출.
  2. 특정 값: 처음 나타날 때, 지정한 값이 바뀔 때, 사라질 때 함수 호출. `useEffect` 안에서 사용하는 상태, props.
  3. 생략: 컴포넌트가 리렌더링 될 때마다 함수 호출

 - - -

#### useMemo - 렌더링 최적화

결과값 재사용.

첫번째 파라미터: 어떻게 연산할지 정의하는 함수  
두번째 파라미터: deps 배열. 배열 안 내용이 바뀌면 함수 호출. 내용이 바뀌지 않으면 이전에 연산한 값 재사용.

```JavaScript
const count = useMemo(() => countActiveUsers(users), [users]);
return( <div>{count}</div> );
```

#### useCallback - 렌더링 최적화

함수 재사용. 컴포넌트에서 props가 바뀌지 않았으면 새로 렌더링하지 않고 컴포넌트 결과물을 재사용하기 위해 필요. `useMemo` 기반.

함수 안에 사용하는 상태 또는 props를 deps 배열 안에 포함시킨다. deps 배열 안 내용이 바뀌면 함수 호출.

```JavaScript
// username, email: input 상태
// users: 객체 배열 상태
const onCreate = useCallback(() => {
  const user = {
    id: nextId.current,
    username, // username: username
    email // email: email
  };
  setUsers(users.concat(user));
}, [users, username, email]);
```

이때 user 중 하나라도 변화가 생기면 users에 변화가 생기면 리렌더링 된다. 특정 항목을 수정할 때 해당 항목만 리렌더링 되게 만들기 위해서 `useState`의 함수형 업데이트를 사용한다.

```JavaScript
const onCreate = useCallback(() => {
  const user = {
    id: nextId.current,
    username, // username: username
    email // email: email
  };
  setUsers(users => users.concat(user));
}, [username, email]);
```

- - -

#### useReducer - 상태 관리

컴포넌트 상태 업데이트 로직을 컴포넌트에서 분리.

##### reducer 함수

새로운 상태를 반환한다.  
파라미터: 현재 상태, 액션 객체

```JavaScript
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
```

##### useReducer 사용법

`const [상태, 액션발생함수] = useReducer(reducer함수, 초기 상태)`

```JavaScript
import React, { useReducer } from 'react';

const [state, dispatch] = useReducer(reducer, 0);

const onIncrease = () => {
    dispatch({ type: 'INCREMENT' });
    // 해당 타입 액션을 발생시킨다.
  };
```

### 1-8. React.memo - 렌더링 최적화

컴포넌트의 props가 바뀌지 않았다면 리렌더링 방지.

```JavaScript
const CreateUser = () => { return(); };
export default React.memo(CreateUser);

const User = React.memo(function User(){ return(); });
```

### 1-9. Context API - 전역 값 관리

프로젝트 안에서 전역적으로 사용할 수 있는 값 관리.  
`useReducer`와 함께 사용한다.

#### `const UserDispatch = React.createContext(null);`

파라미터: Context를 쓸 때 디폴트 값.  
예시에서는 UserDispatch라는 Context 생성.

#### `<UserDispatch.Provider value={dispatch}>...</UserDispatch.Provider>`

감싸진 컴포넌트에서 Context 값 조회 가능.  
예시에서는 `dispatch`

#### 다음에 불러와서 사용 가능하게 만들기

```JavaScript
export const UserDispatch = React.createContext(null);
import { UserDispatch } from './App';
```

#### UserDispatch Context 조회하기

```JavaScript
import React, { useContext } from 'react';
import { UserDispatch } from './App';

const dispatch = useContext(UserDispatch);
```

### 1-10. Date()

`new Date()`: Date 객체 반환  

`toLocaleDateString(언어,{객체 키: year, month, day, weekday})`
사용자 문화권에 맞는 시간표기법으로 객체의 시간 반환.

## 2. styled-components

> 터미널: yarn add styled-components  
> js파일: import styled from 'styled-components`;

### 2-0. Tagged Template Literal

Template Literal 내부에 넣은 js 값 조회.

```JavaScript
const red = '빨간색';
const blue = '파란색';
function favoriteColors(texts, ...values) {
  console.log(texts);
  console.log(values);
}
favoriteColors`제가 좋아하는 색은 ${red}과 ${blue}입니다.`
// ["제가 좋아하는 색은", "과", "입니다.", raw: Array(3)]  
// ["빨간색", "파란색"]
```

문자열은 다음과 같이 분해된다.

* texts: ["제가 좋아하는 색은", "과", "입니다."]  
* values: ["빨간색", "파란색"]

#### `.reduce()`를 사용해서 문자열 조립

```JavaScript
function favoriteColors(texts, ...values) {
   return texts.reduce((result, text, i) => `${result}${text}${values[i] ? `<b>${values[i]}</b>` : ''}`, '');
}
favoriteColors`제가 좋아하는 색은 ${red}과 ${blue}입니다.`
// 제가 좋아하는 색은 <b>빨간색</b>과 <b>파란색</b>입니다.
```

#### Tagged Template Literal 내부에서 함수 사용

```JavaScript
function sample(texts, ...fns) {
  const mockProps = {
    title: '안녕하세요',
    body: '내용은 내용내용 입니다.'
  };
  return texts.reduce((result, text, i) => `${result}${text}${fns[i] ? fns[i](mockProps) : ''}`, '');
}
sample`
  제목: ${props => props.title}
  내용: ${props => props.body}
`
/*
"
  제목: 안녕하세요
  내용: 내용은 내용내용 입니다.
"
*/
```

### 2-1. styled-components 사용법 예시

스타일 입력과 동시에 해당 스타일을 가진 컴포넌트 생성.

```JavaScript
const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  background: black;
  border-radius: 50%;
`;
```

`styled.div`: `div` 스타일링  
`styled.input` `input` 스타일링

- - -

#### Circle 컴포넌트에 props 넘기기

```JavaScript
const Circle = styled.div`
  background: ${props => props.color || 'black'};
`;
// 디폴트는 검은색

function App(){
  return <Circle color="blue" />;
}
```

- - -

#### 조건부 스타일링

eg) `huge` props가 넘어온 경우 css로 정의된 스타일 적용.

```JavaScript
import styled, { css } from 'styled-components';

// Circle 컴포넌트 안
// huge props를 설정했을 때 크기 키우기
${props =>
  props.huge &&
  css`
    width: 10rem;
    height: 10rem;
  `}
```

- - -

#### Sass 선택자

* `&` : 부모 선택자  
* `&:hover`: 커서가 위에 있을 때  
* `&:active`: 클릭시?
* `& + &`: TOADD
* `&:focus`: TOADD

- - -

#### polished

eg) 색 연하게, 진하게 설정.

```JavaScript
import { darken, lighten } from 'polished';
background: ${lighten(0.1, '#228be6')};
```

- - -

#### ThemeProvider

설정한 값은 styled-components에서 `props.theme`로 조회.

eg) `props.theme.palette.blue`

```JavaScript
import styled, { ThemeProvider } from 'styled-components';
<ThemeProvider
      theme={{
        palette: {
          blue: '#228be6',
          gray: '#495057',
          pink: '#f06595'
        }
      }}
>
  /* 이 사이에 있는 styled-components에서 조회 가능 */
</ThemeProvider>
```

- - -

#### keyframes

eg) 아래에서 위로 올라가는 트랜지션 효과 적용

```JavaScript
import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const DialogBlock = styled.div`
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
`;
```

eg) 천천히 사라지는 트랜지션 효과

`animate`: 현재 트랜지션 효과를 보여주고 있는 중이라는 상태  
`localVisible`: 실제로 컴포넌트가 사라지는 시점 지연시키기 위한 상태

```JavaScript
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    // visible 값이 false가 되면
    if (localVisible && !visible) {
      //  animate 값을 true로 바꿔주고 250ms 이후 false로 바꿔준다.
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);

    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!animate && !localVisible) return null;
  // 트랜지션 효과가 끝나고 
  ```

## 3. 기타 CSS

### position

#### static

디폴트. 차례대로 왼쪽->오른쪽, 위->아래로 쌓임.

#### relative

static 상태를 기준으로 `top`, `right`, `bottom`, `left` 속성 사용해 위치 조절 가능.

#### absolute

position: static 속성을 가지고 있지 않은 조상 기준으로 위치 조절. 그런 조상이 없다면 가장 위의 태그 `body`가 기준.

#### fixed

특정 위치에 고정

- - -

### box-shadow

테두리 감싸는 그림자 효과.

`box-shadow: 수평 수직 흐릿함 확산정도 색상`

- - -

### margin, padding 순서

`margin: 상 우 하 좌`

- - -

### overflow

내용이 너무 커서 요소 블럭에서 넘칠 때.

`overflow: visible;`: 넘치는 상태로 보이기  
`overflow: hidden;`: 잘라내기  
`overflow: scroll;`: 스크롤바
`overflow: auto;`

`overflow-x`, `overflow-y`

- - -

### react-icons

아이콘

eg) `import { MdDone, MdDelete } from 'react-icons/md';`

`MdDone`: 체크 아이콘
`MdDelete`: 쓰레기통 아이콘

- - -

### z-index

더 큰 `z-index` 값을 가진 요소가 작은 값의 요소 위를 덮음.
