# DOM INTRODUCTION

DOM (Document Object Model)

- The `DOM` API is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.
- The `DOM` represents the document as a tree of objects; each object represents a part of the page.

`Document` in a NodeJS application doesn't exist, but on the browser it does.

`Browser JS`

- setTimeout()
- fetch
- setInterval()
- document

`Node JS`

- setTimeout()
- http
- fs

Creating a simple website to calculate the sum of two numbers.

- This is a static website, clicking a button does nothing.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOM Intro</title>
  </head>
  <body>
    <input id="val1" type="text" placeholder="Value 1" />
    <br />
    <br />
    <input id="val2" type="text" placeholder="Value 2" />
    <br />
    <br />
    <div id="sum"></div>
    <br hidden />
    <button>Calculate Sum</button>
  </body>
</html>
```

Before solving this dynamic thing, first lets understand `classes` and `id` in HTML.

1. `class`

   - An attribute used to specify a class for an HTML element.
   - Multiple HTML elements can share the same class.

2. `id`
   - An attribute used to specify a id for an HTML element.
   - id names can't used more than once in other HTML elements.
   - Usually used in manipulating JavaScript.

- `class example`

```html
<style>
  .section {
    background-color: 'red';
    margin: 10px;
    padding: 10px;
  }
</style>
<body>
  <div class="section">DIV 1</div>
  <div class="section">DIV 2</div>
</body>
```

- `id example`

```html
<body>
  <div id="section1">DIV 1</div>
  <div id="section2">DIV 2</div>

  <script>
    const s1 = document.getElementById('section1');
    const s2 = document.getElementById('section2');
  </script>
</body>
```

Making them dynamic.

1. Changing the elements on the website once the website is loaded.
2. Actually calculating the sum based on the inputs and rendering it on the screen.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DOM Intro</title>
  </head>
  <body>
    <input id="val1" type="text" placeholder="Value 1" />
    <br />
    <br />
    <input id="val2" type="text" placeholder="Value 2" />
    <br />
    <br />
    <div id="sum"></div>
    <br hidden />
    <!-- adding an eveent listener -->
    <button onclick="calculateSum()">Calculate Sum</button>

    <script>
      // creating a function that responds
      function calculateSum() {
        // get the values from the input, when the function invokes
        const val1 = document.getElementById('val1').value;
        const val2 = document.getElementById('val2').value;
        // gets the div where to render the result
        document.getElementById('sum').innerHTML =
          parseInt(val1) + parseInt(val2);
        // parses the values as they are string
      }
    </script>
  </body>
</html>
```

Lets say we don't want to expose this logic to the frontend, so we put this business logic in the backend and do the API call to it.

`Backend Server`

- `https://sum-server.100xdevs.com/sum?a=1&b=2`

```html
<body>
  <input oninput="populateDiv()" id="val1" type="text" placeholder="Value 1" />
  <br />
  <br />
  <input oninput="populateDiv()" id="val2" type="text" placeholder="Value 2" />
  <br />
  <br />
  <div id="sum"></div>
  <script>
    async function populateDiv() {
      const val1 = document.getElementById('val1').value;
      const val2 = document.getElementById('val2').value;
      const res = await fetch(
        `https://sum-server.100xdevs.com/sum?a=${val1}&b=${val2}`
      );
    }
  </script>
</body>
```

The problem in the above code is if we know that we have to add only two numbers 123 and 433, but while inputting these numbers we are continously sending requests to our backend, and have already sent over 6 requests to the backend, but it should have been only 1 request.

So to solve this issue we are going to use the concepts below.

## Debounce and Throttle

Here the problem with the event listener is we are using that to make frequent API request to our backend, even if we haven't yet filled all the input yet.

These frequent API calls will affect our backend a lot.

So to solve this we can make use of two methods `Debouncing` and `Throttling`.

`Throttling`

- It is useful when you want to ensure that a function is called at a limited rate or frequency, without missing any important inputs or events.

`Example for Throttling:`

- Imagine a real-time data processing application that recieves a high volume of incoming data streams.
- If the data is processed too quickly, it may cause the application to become overwhelmed and unresponsive.
- In this case, throttling the processing functiion to a specific frequency can help manage the load and maintain the performance of the application.

`Debouncing`

- It delays the execution of a function until after a certain amount of time has passed without the input being triggered again.
- Search Filter

`Example for Debouncing:`

- Imagine you have a search bar on a website that sends a request to the server every time a user types a letter.
- If the user types quickly, this could result in multiple requests being sent to the server in a short period of time, whiich can cause unnecessary load and slow down the website.

- To prevent this, you could use a debounce function to delay the search requset util the user has finished typing.
- For example, if you set a debounce of 500 miliseconds, the search request will only be sent after the user has stopped typing for half a second.
- This ensures that only one request is sent to the server even if the user types quickly.

```js
let interval;
function debouncePopulateDiv() {
  // delay the call to populateDiv until i've not been called for 1000ms
  // and i've been called atleast once
  clearTimeout(interval);
  interval = setTimeout(() => {
    populateDiv();
  }, 1000);
}
async function populateDiv() {
  const num1 = document.getElementById('num1').value;
  const num2 = document.getElementById('num2').value;
  console.log(num2);
  try {
    const res = await fetch(`http://localhost:3000/sum?a=${num1}&b=${num2}`);
    const sum = await res.json();
    document.getElementById('finalSum').textContent = sum;
  } catch (e) {
    console.log('Could not make request');
  }
}
```
