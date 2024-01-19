# WEEK 7.2 - CONTEXT, STATE MANAGEMENT AND RECOIL

## Context

- Context lets you teleport state values to distant children, helps you get rid
  of prop drilling.

We also did some work on `Context API`:

```js
function App() {
  const [count, setCount] = useState(0);
  // wrap anyone that wants to use
  // the teleported value inside a provider
  return (
    <CountContext.Provider value={count}>
      <Count setCount={setCount} />
    </CountContext.Provider>
  );
}
```

```js
function Count({ setCount }) {
  console.log("count re-rendered");
  return (
    <div>
      <CountRenderer />
      <Buttons setCount={setCount} />
    </div>
  );
}
```

```js
function CountRenderer() {
  const count = useContext(CountContext);
  return <div>{count}</div>;
}
```

`context.js`

```js
import { createContext } from "react";

export const CountContext = createContext(0);
```

In the above application we are teleporting the count state using `Context API`,
but the problem arises when we are passing the `setCount` prop to `Count`
component which doesn't even need the `setCount` method. So it re-renders the
whole UI.

We want to resolve this issue of re-rendering and passing the state and achieve
this we are going to use a `State Management Tool` called `Recoil`.

Because `Context API` doesn't fix re-rendering, only fixes prop drilling.

`Why do you use the Context API?`

- To make syntax cleaner / get rid of `prop drilling`. [`YES`]
- To make rendering more performant. [`NO`]

## State Management

And to achieve both of these we would use a `State Management Library`.

`What is State Management?`

- A cleaner way to store the state of your app.
- Until now, the cleanest thing you can do is use the `Context API`.
- It lets you teleport state.
- But there are better solutions that get rid of the problems that `Context API`
  has (unnecessary re-renders).

Any `React` codebase can be divided into two big parts, like one codebase would
have all the `state` logic and another codebase would have `components` logic.

Until now we have shoved all the `state` logic into the components only. With
this `State Management Tools` we can have a separation of concern. With all our
state logic in other file and components in other.

## Recoil

- A state management library for React, written by ex `React` folks.
- Other popular ones are:
  - Zustand
  - Redux

`Recoil`

- Has a concept of an `atom` to store the state.
- An atom can be defined outside the component.
- Can be teleported to any component.

Most of the times we would be craeting `atoms`, an atom is similar to the
`useState` hook we've been using, this also is used to defined a state variable
and this also does the same but in the `recoil` world respectively.

`APIs / Functions provided by the Recoil`

1. RecoilRoot
2. atom
3. useRecoilState
4. useRecoilValue
5. useSetRecoilState
6. selector

`atom`

```js
import { atom } from "recoil";

const countAtom = atom({
  key: "countAtom",
  default: 0,
});

export default countAtom;
```

We have to first define an atom where the `atom` takes an agrument as an objectt
and it has a pre-defined values where we have to pass `key` value where it
should be unique, and a `default` value.

With this we have defined all the `state` logic in another file called
`count.jsx` inside the `atoms` folder.

Now as we have defined our `atom` we can make use of pre-defined hooks that are
present in the `Recoil` library.

`useRecoilState`

- It is almost like the `useState` hook provided by the react, here also we get
  two values from `getting` the state and `setting` the state.

`useRecoilValue`

- This is used to just get the `state` value, we cannot `set` the state using
  this hook.

`useSetRecoilState`

- This is used for `setting` the state value, it can't be used for getting the
  state value.

```js
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import countAtom from "./store/atoms/count";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  );
}

function Count() {
  console.log("RE-RENDER");
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);
  return <div>{count}</div>;
}

function Buttons() {
  const [count, setCount] = useRecoilState(countAtom);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default App;
```

We have to wrap the component that needs this `atom's` value and key with the
`<RecoilRoot>` component and all the child elements inside this component can
make use of the hooks provided by the `Recoil` would easily `get` or can `set`
those state values.

We can see that the `Count` component only re-renders once and whenever we are
increasing the count or decreasing the count it does it not re-render.

If we will look at the `Buttons` component it does not need the `count` value,
it just need to update it.

And we can set the count using two ways:

```js
setCount(count + 1);
```

`or`

```js
setCount((curr) => curr + 1);
```

In the second way we are getting the current value and adding that current value
with one.And the second do not require the count to be present there.

And to achieve this we use make use of `useSetRecoilState` where it provides us
with a method which is used for settting the state.

```js
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import countAtom from "./store/atoms/count";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  );
}

function Count() {
  console.log("RE-RENDER");
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);
  return <div>{count}</div>;
}

function Buttons() {
  const setCount = useSetRecoilState(countAtom);
  return (
    <div>
      <button onClick={() => setCount((curr) => curr + 1)}>Increase</button>
      <button onClick={() => setCount((curr) => curr - 1)}>Decrease</button>
    </div>
  );
}

export default App;
```

With this the `Button` component would re-rennder only once, even if we update
the count variable, it won't re-render.

### Selector

Lets say you are given that you have to render `IT IS EVEN` if the current count
is even.

```js
function ShowEven() {
  const count = useRecoilValue(countAtom);
  return count % 2 == 0 ? <div>It is even</div> : "";
}
```

We can also define it inside the `useMemo` hook, but it be would more optimal if
we are going to use the `selector` in Recoil.

First we need to define the selector inside the `count.jsx` file.

```js
export const isEven = selector({
  key: "evenSelector",
  get: ({ get }) => {
    const count = get(countAtom);
    return count % 2;
  },
});
```

Here we get a function called `get` which takes a prop called `get` that's a
method, where we are passing and getting the count from `countAtom` and doing
the calculations.
