# WEEK 5.1 - REACT FOUNDATIONS

Learning path

- JSX
- Class vs ClassName
- Static vs Dynamic Websites
- State
- Components
- Re-rendering

React is being primarily used for building dynamic websites, because it makes easier to do DOM manipulation.

```html
<html>
  <script>
    function onButtonPress() {
      const currentValue = document.getElementById("btn").innerHTML;
      console.log(currentValue.split(" "));

      const currentCounter = currentValue.split(" ")[1];
      const newCounter = parseInt(currentCounter) + 1;
      document.getElementById("btn").innerHTML = "Counter " + newCounter;
    }
  </script>
  <body>
    <button id="btn" onclick="onButtonPress()">Counter 0</button>
  </body>
</html>
```

Above is a basic web app to increase the counter using just JS AND HTML where we are manipulating the UI using JS only.

`Problem with this approach:`

1. Too much code you have to write as the developer.
2. As your app scales (todo app for eg), this gets harder and harder.

`Why React?`

- DOM manipulation is harder in the conventional way when building big application.
- There were libraries that came into the picture that made it slightly easy, but still for a very big app it's very hard (JQuery).
- Eventually, Vue/React created a new syntax to do front-end.

`To create a react app, you usually need to worry about three things.`

- State
- Components
- Re-rendering

1. State
   - An object that represents the current `state` of the app.
   - It represents the dynamic things in your app (things that change)
   - Example the value of the counter.
2. Components
   - How a DOM element should render, given a state.
   - It is a re-usable, dynamic, HTML snippet that changes given the state.
   - This button is a component, it takes the state (`currentState`) as an input and is supposed to render accordingly.
3. Re-rendering
   - A state change triggers a re-render.
   - A re-render represents the actual DOM being manipulated when the state changes.

`Create a counter app using state / components`

```html
<!doctype html>
<html>
  <body>
    <div id="buttonParent"></div>
    <script>
      let state = {
        count: 0,
      };

      function onButtonPress() {
        state.count++;
        buttonComponentReRender();
      }

      function buttonComponentReRender() {
        document.getElementById("buttonParent").innerHTML = "";
        const component = buttonComponent(state.count);
        document.getElementById("buttonParent").appendChild(component);
      }
      function buttonComponent(count) {
        const button = document.createElement("button");
        button.innerHTML = `Counter ${count}`;
        button.setAttribute("onclick", "onButtonPress()");
        return button;
      }
      buttonComponentReRender();
    </script>
  </body>
</html>
```

`Equivalent for the above above in React`

```js
import React from "react";

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Button count={count} setCount={setCount} />
    </div>
  );
}

function Button(props) {
  function onButtonClick() {
    props.setCount(props.count + 1);
  }
  return <button onclick(onButtonClick)>Counter {props.count}</button>
}

export default App;
```

- The above code is a JSX snippet, which uses JavaScript and XML which have HTML like syntax
  in it.
- We also make use of the `useState` hook, which stores the state of the our count variable.
- And gives a function that we set as `setCount` and changes it accordingly.
- We can also make use of the `npm run build` that gives a production build for our file, which has just the `js`, `html` and `css` files that can be render onto the browser easily.
- We can also pass properties to the JSX element or the component, and destructure it.

The above code is being transpiled back to old syntax, over the syntactic sugar.

```js
import React from "react";

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Button count={count} setCount={setCount} />
    </div>
  );
}

function Button(props) {
  function onButtonClick() {
    props.setCount(props.count + 1);
  }

  return React.createElement(
    "button",
    {
      onClick: onButtonClick,
    },
    `Counter ${props.count}`,
  );
}

export default App;
```

So basically the JSX helps us converting that old React syntax with HTML-Like syntax.

Anytime a parent re-renders its child also re-renders.
