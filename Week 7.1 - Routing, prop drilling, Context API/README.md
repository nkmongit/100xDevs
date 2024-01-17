# WEEK 7.1 - Routing, prop drilling, Context API

## Routing

`Jargon`

1. Single Page Applications
2. Client Side Bundle
3. Client Side Rendering

### Single Page Application

- `React` is used to build single page applications, before React how were web
  apps were created?
- Lets say you visit `https://www.linkedin.com` you send an `http` request to
  the backend you get back `index.html`, `styles.css` and `script.js`, etc.
- But if we change our page to `https://www.linkedin.com/messages` we would send
  another request, that we changed our page and give us back our new
  `index.html`, etc.
- An we would get back those respective files for `messages` page from our
  server.
- There would be a `hard reload` of the page which means we will see a
  `white screen` for a while and then eventually `index.html` would come back
  and website would render.
- This how we would do things `PRE-REACT` days.
- So when we use `React` we would build `SPA`, that means when we visit the page
  of linkedin only the first time we get all the files `index.html`,
  `styles.css` , `script.js`, etc.
- As we change pages, or click on button there, go to `messages` tab there's no
  need for more `html`, `css` or `js` to come, it all came in the first go
  itself.

### Client Side Bundle

- This basically means the bundle we get from the backend.
- HTML, CSS and JS, more specifically JS is what called a `bundle`.
- This bundle all the files that needed for your whole application.

### Client Side Routing

- And based on the bundle we get from the backend, we perform client side
  routing here.
- Like at what page the user is in, we show that on the screen.

`What are routes?`

Basically we are talking about client side routing here, and routes are
different pages that we need to render we hit that route.

For example:

- If we are at `https://www.linkedin.com` this should show our homepage, this is
  a `/` route.
- Meanwhile if we visit the route `messages` like
  `https://www.linkedin.com/messages`, this should render the messages tab for
  us.

But how does this routing happens in `React` and for that we will use something
like `react-router-dom` library. [React Router]("https://reactrouter.com")

Example for using this library and do routing:

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
```

In here we have defined two routes one for our landing page
`http://localhost:5173` this would render the `<Landing />` component for us at
the page, and if we visit `http://localhost:5173/dashboard` this would render
the `<Dashboard />` component for us.

`<BrowserRouter>` is the parent element for the inside children elements.

As we can see no matter what page are we in linkedin always render the
`Navigation` component throught out the page.

So to achive this we will build a Navigation component and render it all over
our application.

`Navigation Component`

```js
const Navigation = () => {
  return (
    <div>
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          backgroundColor: "black",
          color: "white",
          listStyle: "none",
        }}
      >
        <li>Dashboard</li>
        <li>Layout</li>
      </ul>
    </div>
  );
};

export default Navigation;
```

Changes to be made in the `App.jsx` where our all routing is defined.

```js
function App() {
  return (
    <div>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

If this is a single page application, and if clicking on button would take us to
a diffrent page would that `not` mean that `index.html` is coming back from the
server. Lets say we have created two button in the `Navigation` when clicking on
one button it takes us to the `Landing` page and clicking on another would take
take us to `Dashboard` page and we can switch betweeen them.

```js
const Navigation = () => {
  return (
    <div>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Landing
      </button>

      <button
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        Dashboard
      </button>
    </div>
  );
};

export default Navigation;
```

We have used this `global location` object that comes from our DOM, but the
problem in this way of navigating to our pages, we breaking the concept of `SPA`
of `React` and whenever we are clicking on one of those buttons, our whole page
requests for the bundle again and `reloading` happens too. That tells us that we
are not actually doing `client side rendering` we are still refreshing the page.

And the reason is that we are using `window.location.href` to route pages. And
this is not the right way to navigate through pages.

To overcome from this issue we are going to use `useNavigate()` hook. It gives
you a method called `navigate()` which can be used to navigate between pages.

It makes sure that it is not doing a hard reload, simply canging the route
keeping the same client bundle and changing the page because the route has
changed.

```js
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function landingNavigate() {
    navigate("/");
  }
  return (
    <div>
      <button onClick={landingNavigate}>Landing Page</button>
    </div>
  );
}
```

We can see that while clicking on the button we execute a function called
`landingNavigate` which then uses the `navigate` method to navigate to '/' page.

We can also observe that the page is not reloading and we are not fetching the
client bundle and this doesn't do any hard reload.

But there's still some optimization left which can be done using `lazy loading`.

As we know that when we visit the website a complete bundle comes back all at
once, the problem is a person will just come to the `Landing` page and won't
visit any other page, then why are we getting the whole bundle which includes
the code for `Dashboard` page also. Shouldn't a person only get the bundle for
the page they visit.

We can make use of `React.lazy` and wrap our imports into it.

```js
const Dashboard = React.lazy(() => import("./components/Dashboard"));
```

Only this wouldn't work alone we to need add a `Suspense` component because it
is required by the lazy function basically used to wrap lazy components. It
takes a fallback property that accepts the react elements you want to render as
the lazy component is being loaded.

```js
function App() {
  return (
    <div>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={"Loading..."}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={"Loading..."}>
                <Landing />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
```

## Prop Drilling

Before we begin, how do you think one should manage state?

1. Keep everything in the top level (C1)
2. Keep everything as low as possible (at the LCA of children that need a
   state) - `More Preferrable`

- Either way, you will need to `drill` props down through the `Component` tree.
- This gets very hard to main and highly verbose.
- Makes code highly unreadable.

- Prop drilling doesn't mean that parent re-renders children.
- It just means the `syntactic uneasiness` when writing code.

```js
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Count count={count} setCount={setCount} />
    </div>
  );
}

function Count({ count, setCount }) {
  return (
    <div>
      {count}
      <Buttons count={count} setCount={setCount} />
    </div>
  );
}

function Buttons({ setCount, count }) {
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default App;
```

Here we are trying to pass our `count` and `setCount` state to every component,
even though the `Count` component doesn't need the method `setCount`.

`PROBLEM WITH PASSING PROPS`

Passing props is a great way to explicitly pipe data through your UI tree to the
components that use it.

But passing props can become verbose and inconvenient when you need to pass some
`prop` deeply through the tree, or if many components need the same prop. The
`nearest common ancestor` could be far removed from the components that need
data, and lifting state up that high can lead up to a situation called
`prop drilling`.
[Read more about Passing Data]("https://react.dev/learn/passing-data-deeply-with-context")

Wouldn't it be great if there were a way to `teleport` data to the components in
the tree that need it without passing props?

## Context API

So to fix the issue of `prop drilling` we use `Context API`

If you use the `Context API`, you are pushing your stae management outside the
code react components.

```js
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Count count={count} setCount={setCount} />
    </div>
  );
}

function Count({ count, setCount }) {
  return (
    <div>
      <CounterRenderer count={count} />
      <Buttons count={count} setCount={setCount} />
    </div>
  );
}

function CounterRenderer({ count }) {
  return <div>{count}</div>;
}

function Buttons({ count, setCount }) {
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase Count
      </button>

      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease Count
      </button>
    </div>
  );
}

export default App;
```

In the above code we are passing down the props to the needed children even
though in certain components we don't even require those state variables or
methods.

But somehow we need to teleport the `count` variable to `CounterRenderer`
component without passing it through `Count` component, which doesn't seem to
use the `count` state variable anywhere it's component.

To solve this:

1. Create a file called `context.jsx` where create a context.

```js
import { createContext } from "react";

// teleporter
export const CountContext = createContext(0);
```

2. Now we have to share this context to the child elements, who needs it. So now
   we need to wrap this context to whomsoever needs the context inside a
   `Provider.`

3. And pass that `Provider` the value it needs to share with anyone. Here we
   pass the `count` state variable inside the value.

```js
<CountContext.Provider value={count}>
  <Count count={count} setCount={setCount} />
</CountContext.Provider>
```

4. Now we pass the value we need whatsoever component we want to.Here we are
   making use of `useContext` hook where we pass the context we craeted
   `CountContext` which has the state value `count`.

```js
function CounterRenderer() {
  const count = useContext(CountContext);
  return <div>{count}</div>;
}
```

Here we saw that the `count` state variable doesn't need to be drilled into
every component to reach `CounterRenderer` Component.

```js
import { useContext, useState } from "react";
import { CountContext } from "./context";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CountContext.Provider value={count}>
        <Count count={count} setCount={setCount} />
      </CountContext.Provider>
    </div>
  );
}

function Count({ setCount }) {
  return (
    <div>
      <CounterRenderer />
      <Buttons setCount={setCount} />
    </div>
  );
}

function CounterRenderer() {
  const count = useContext(CountContext);
  return <div>{count}</div>;
}

function Buttons({ setCount }) {
  const count = useContext(CountContext);
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase Count
      </button>

      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease Count
      </button>
    </div>
  );
}

export default App;
```

`context.jsx`

```js
import { createContext } from "react";

// teleporter
export const CountContext = createContext(0);
```
