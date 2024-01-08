# WEEK 6.1 - REACT AND HOOKS

In this moodule we are doing a deeper dive into the following topics.

1. React Returns
2. Re-rendering
3. Key
4. Wrapper Components
5. useEffect
6. useMemo
7. useCallback
8. useRef

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

Other than passing the statte down and creating another component, we can use something called as `React.memo`
