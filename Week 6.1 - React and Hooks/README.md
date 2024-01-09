# WEEK 6.1 - REACT AND HOOKS

In this moodule we are doing a deeper dive into the following topics.

1. React Returns
2. Re-rendering
3. Key
4. Wrapper Components
5. Hooks

## React Component Returns

A component can only return a single top level XML, we cannot return multiple siblings.

1. Makes it easy to do reconcilation.

```js
function App() {
    return (
        <Header title="NISHANT"/>
        <Header title="LEARNING FROM THE BEST"/>
    )
}


function Header({title}) {
    return <div>
        {title}
    </div>
}
```

In the above program the App component is trying to return two Header component, but that is not allowed in react.

To solve this issue we have wrap these two components in one parent `<div>` or with a react fragment `<> <>` this solves the issue of returning only element.

```js
function App() {
  return (
    <>
      <Header title='NISHANT' />
      <Header title='LEARNING FROM THE BEST' />
    </>
  );
}

function Header({ title }) {
  return <div>{title}</div>;
}
```

Making use of Fragment from react doesn't introduce an extra DOM element.

## Re-rendering in React

Anytime a final DOM manipulation happens or whenever React actually updates the DOM it is what considered as re-render.

- Update the last app to allow user to update the title of the first Header with a new title.

```js
function App() {
  const [title, setTitle] = useState('NISHANT');

  function changeTitle() {
    setTitle(Math.random());
  }

  return (
    <>
      <button onClick={changeTitle}>Click me to change the title</button>
      <Header title={title} />
      <Header title='LEARNING FROM THE BEST' />
    </>
  );
}

function Header({ title }) {
  console.log('re-render happened');
  return <div>{`My name is ${title}`}</div>;
}
```

In above the program the only thing that needs to re-render is the Header component whose title is being changed.
But the whole app re-renders.

A re-render means that

1. React did some work to calculate what all should upadte in this component.
2. The component actually got called (you can put a log to confirm this).
3. The inspector shows you a bounding box around the component.

It happens when

1. A state variable that is being used inside a component changes.
2. A parent component re-render triggers all children re-rendering.

You want to minimise the number of re-renders to make a highly optimal react app.
The more the components that are getting re-rendered, the worse.

`We can push the state down`

```js
function App() {
  return (
    <>
      <HeaderWithButton />
      <Header title={'my name is something somethinn'} />
    </>
  );
}

function HeaderWithButton() {
  const [title, setTitle] = useState('Nishant');

  function changeTitle() {
    setTitle('My namme is ' + Math.random());
  }

  return (
    <>
      <button onClick={changeTitle}>Click me to change title</button>
      <Header title={title} />
    </>
  );
}

function Header({ title }) {
  return <div>{title}</div>;
}
```

In the above code snippet we have introduced a new component called `HeadWithButton` which has all the state about changing the title of the `Header` component and pass it through props to it.
So whenever there's a change in the state only the `HeaderWithButton`
component changes and the `Header` components where the state has affected.

Other than passing the state down and creating another component, we can use something called as `React.memo`

But the `React.memo` won't work if the elements are wrapped inside fragments `<></>`

NOTE: Never push state from child to a parent it's an anti pattern.

## Keys in React

Lets create a simple todo app that renders 3 todos

1. Create a Todo component that accepts title, description as input.
2. Initialise a state array to render all the TODOs.
3. Iterate over the array to render all the TODOs.
4. A button in the top level App component to add a new TODO.

The concept of providing a key to the react is to help raect differentiate whenever an element gets removed from where, added to where and giving an key is the best way to solve this.
The `key` should be unique.

## Wrapper Components

```jsx
function App() {
  return (
    <div>
      <CardWrapper innerComponent={<TextComponent />} />;
    </div>
  );
}

function TextComponent() {
  return <div>Hi there!</div>;
}

function CardWrapper({ innerComponent }) {
  return (
    <div style={{ border: '2px solid black', padding: 20 }}>
      <innerComponent />;
    </div>
  );
}
```

## Hooks

- useEffect
- useMemo
- useCallback
- useRef
- useReducer
- useContext
- useLayoutEffect

We have already discussed about the `useState` hook.

Hooks in React are functions that allow you to "hook into" React state and lifecycle features from function components.

Lifecycle events were first introduced in class based components, those were componentDidMount(), shouldComponentUpdate().

But in the newer version of react we have introduced with the functional based components where, we use such hooks to do all the lifecycle events.

You can't write `fetch()` solely inside a component it cause to infinite loop, so we have to use a hook called `useEffect()`

That means if this component mounts do something.

```jsx
const { useEffect } = require('react');

function App() {
  useEffect(function () {
    alert('Hi');
  }, []);

  return <div>Hi there</div>;
}

export default App;
```

If we run the above code, the first thing that comes on the screen is an alert box saying Hi, because useEffect hook would render it on the first load on the page, as it's `dependency array` is empty that means it should run on the first mount, if we would put more values in the `dependency arry` if there state changes then it would mount again.
