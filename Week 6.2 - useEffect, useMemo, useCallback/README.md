# WEEK 6.2 - useEffect, useMemo and useCallback

What we we gonna focus on

1. useEffect
2. useMemo
3. useCallback
4. Custom Hooks
5. Prop Drilling

Two jargons before we start.

1. Side Effects
2. Hooks

`Side Effects`

In React, the concept of side effects encompasses any operations that reach
outside the functional scope of a React component. THese operations can affect
other components, interact with the browser, or perform asynchronous data
fetching.

```js
setTimeout();
fetch();
setInterval();
document.getElementById('').innerJTML = '';
```

`Hooks`

Hooks are a feature introduced in React 16.8 that allow you to use state and
other React features without writing a class. They enable functional components
to have access to stateful logic and lifecycle features, which were previously
only possible in class components. This has led to more concise and readable way
of writing components in React.

Some common hooks are these

1. useState
2. useEffect
3. useCallback
4. useMemo
5. useRef
6. useContext

## useState

Lets you describe the state of your app whenever state updates, it triggers a
`re-render` which finally results in a DOM update.

```jsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={function () {
          setCount(count + 1);
        }}
      >
        Click me {count}
      </button>
    </div>
  );
}

export default App;
```

## useEffect

It allows you to perform side effects in functional components. Side effects are
operations that can affect other components or can't be done during rendering,
such as `data fetching`, `subscriptions`, or `manually changing the DOM` in
React components.

The `useEffect` hook serves the same purpose as `componentDidMount`,
`componentDidUpdate`, and `componentWillUnmount` in React class components, but
unified into a single API.

```js
import { useState, useEffect } = require("react")

function App() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        fetch("https://sum-server.100xdevs.com/todos").
        then(async function(res) {
            const json = await res.json();
            setTodos(json.todos)
        })
    }, [])

    return <div>
        {
            todos.map(todo => <Todo key={todo.id} title={todo.title} description={todo.description}/>)
        }
    </div>
}
```

There's a dependency array in the `useEffect` hook where you pass the state
variables as input, when the effect should happen. If they given array has
nothing in it, then this useEffect would run for once, while mounting the
component. This is a dependency array, it states when should the call function
should run. It takes `state variables` as input.

If we don't provide a dependency array whether it be empty, it will fetch for
infinitely.

## useMemo

Before we start, lets understand what `memoization` means, it means remebering
some output given an input and not computing it again.

It also takes a dependency array.

If we are asked to craete an app that does two things

1. Increase a counter by 1.
2. Let user put a value in an input box (n) and you need to show sum of 1 - n.

ONE RESTRICTION - EVERYTHING NEEDS TO BE INSIDE `App`

```js
import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(1);

  function increaseCounter() {
    setCount(count + 1);
  }
  let getCount = useMemo(() => {
    let total = -1;
    for (let i = 0; i <= num; i++) {
      total = total + i;
    }
    return total;
  }, [num]);
  return (
    <>
      <input
        onChange={(e) => {
          const n = e.target.value;
          setNum(n);
        }}
      />
      <div>Sum is {total}</div>
      <button onClick={increaseCounter}>Counter {count}</button>
    </>
  );
}

export default App;
```

Adding an `useEffect()` hook would work too, but it will be depended upon the
`num` state variable, whenever it would change will have to re-render. So it
will cause unnecessary re-rendering.

Another approach would be that we don't have a state variable, instead we still
have the count variable but we only re-compute count when input value changes.

## useCallback

It is used to memoize functions, which can help in optimizing the performance of
your application, especially in cases involving child components that rely on
reference equality to prevent unnecessary renders.

This means that the values are referenctially different.

`For Example`

```js
import { memo, useState } from 'react';
import './App.css';

// variable declared outside of the block
var a = 1;

function App() {
  const [counter, setCounter] = useState(0);

  var a = 1;
  return (
    <div>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      ></button>
      <Demo a={a} />
    </div>
  );
}

const Demo = memo(function ({ a }) {
  console.log('re-render');
  return <div>hi there</div>;
});
```

In the above program we have declared two variables one in the App() block and
another one outside the block.

So if we are using memo that shouldn't re-render the component Demo, because the
`a` variable is not a state and it's not changing.

What if we make the `a` variable as an array, or function, or an object, the
re-render will happen because they are not referencitially equal.

```js
import { memo, useState } from 'react';

import './App.css';

var a = [];

function App() {
  var a = 1;

  var arr = [];
  var obj = {};
  var fn = function () {};
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Counter ({counter})
      </button>
      <Demo a={a} />
      <ArrayDependency arr={arr} />
      <ObjectDependency obj={obj} />
      <FunctionDependency fn={fn} />
    </div>
  );
}

const Demo = memo(function ({ a }) {
  console.log('re-render');
  return <div>Hi there!</div>;
});

const ArrayDependency = memo(function ({ arr }) {
  console.log('re-render array');
  return <div>Array Dependency check console if re-render happens</div>;
});

const ObjectDependency = memo(function ({ obj }) {
  console.log('re-render object');
  return <div>Object Dependency check console if re-render happens</div>;
});

const FunctionDependency = memo(function ({ fn }) {
  console.log('re-render function');
  return <div>Function Dependency check console if re-render happens</div>;
});
export default App;
```

The re-render will happend for every component expect the variable `a`

```js
function sum(a, b) {
  return a + b;
}
function sum2(a, b) {
  return a + b;
}

sum == sum2; // false
// they are referenctially not equal
```

Now comes the use of `useCallback` hook, where if we pass the function indside
this callBack hook the re-render will not happen.

```js
var fnWithCall = useCallback(function () {
  console.log('call from callback');
}, []);
```

Here it also takes the dependency array. But it should be defined within the
`memo()` function nor it will re-render.

```js
import { memo, useCallback, useState } from 'react';

import './App.css';

function App() {
  const [counter, setCounter] = useState(0);

  // function with useCallback - no re-render
  var fnWithCall = useCallback(function () {
    console.log('call from callback');
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Counter ({counter})
      </button>
      <FunctionWithUseCallback fnWithCall={fnWithCall} />
    </div>
  );
}

const FunctionWithUseCallback = memo(function ({ fnWithCall }) {
  console.log('re-render function with useCallback');
  return <div>Function with useCallback hook</div>;
});

export default App;
```

Whereas we know that `var a = 1` and `var b = 1` these both are referenctially
different from each other, and should trigger the re-rendering, but React is
smart enough to know that they are just numbers or values.

## Custom Hooks

Just like `useState`, `useEffect` you can write your own hooks. Only condition
is, it should start with `use` (naming convention).

Because if we won't declare as such with the naming conventions, we can't write
the state variables in it or any re-render stuff.

```js
import { useEffect, useState } from "react";


const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://sum-server.100xdevs.com/todos").then(async function (res) {
      const json = await res.json();
      setTodos(json.todos);
    });
  }, []);

  return todos;
};

function App() {
  const todos = useTodos();
  return (
    <>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </>
  );
}

function Todo({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <h4>{description}</h4>
    </div>
  );
```

In the above program we have created a custom hook for fetching the todos from
the backend API call, it's sole purpose is get the todos and return them, behind
the scenes it uses `useEffect` hook and the `useState` hook where it stores the
JSON data in the `todos` state variable and returns it.

`Pure Component vs useMemo`

These both can be used to optimize the performance of your components, nut they serve different purposes and are used in different contexts.

`Pure Component` is class based component, it is a base class for components that implements a shallow comparison of the props and state objects before deciding whether to re-render.

```js
import React, { PureComponent } from 'react';

class MyComponent extends PureComponent {
  render() {
    return <div>{this.props.value}</div>;
  }
}
```

`useMemo` is a Hook in React that memoizes the result of a computation and returns the memoized value. It is typically used in functional components to memoize expensive calculations or to prevent unnecessary recalculations of values during re-renders.

```js
import React, { useMemo } from 'react';

const MyComponent = ({ value }) => {
  const memoizedValue = useMemo(() => {
    // Expensive computation
    return value * 2;
  }, [value]);

  return <div>{memoizedValue}</div>;
};
```
