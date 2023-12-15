# Express, NodeJS

## Foundation

- `Node.js and its runtime.`

## Backend

- `Backend Communication Protocols.`
- `Express Basic.`
- `Routes, status codes.`

### Node.js and its runtime

- `What is ECMAScript?`

  - It is a scripting language specification on which JavaScript is based.
  - It is what standardise the JavaScript implementation for all browsers.
  - ECMAScript has versioning too, ES6 introduced some widely using features
    arrow functions, classes and template literals.
  - [ECMAScript Specification](https://ecma-international.org/publications-and-standards/standards/ecma-262/)

- `What is JavaScript?`

  - It is a scripting language that conforms to the ECMAScript specification.
    - Like `Date`, `var`, `const`, `function`.
  - JS includes additional features that are not part of the ECMAScript specification, like the Document Object Model.
    - Like `setTimeout()`, `fs.readFile()`.
  - `Common Browser Engines`
    - V8 - Used by google chrome/chromium | C++ | [V8 Engine](https://github.com/v8/v8)
      - Responsible for compiling JS code into native machine code before executing it.
    - Spidermonkey - Used by Firefox | C + Rust | [Spider Monkey](https://spidermonkey.dev/)

- `What is Node.js?`
  - Some developers took out the V8 Engine, added some Backend things `(filesystem reads)`
    on top to create a runtime to run JS in the backend.
  - JS was never meant to be run in the backend.
  - NodeJS is a runtime enviroment that is written using C++ bindings with V8 engine.
- `What is Bun?`

  - The fact that JS is single threaded, NodeJS is slow
  - This is also a runtime enviroment.
  - Written in Zig language (mostly used by traders, low latency), and uses JavaScriptCore as the engine.
  - [Bun Codebase](https://github.com/oven-sh/bun).

- `What can you do with NodeJS?`

  - Create CLIs.
  - Create a video player.
  - Create a game.
  - Create an `HTTP Server`.

### Backend Communication Protocols

- `What is an HTTP Server?`

  - `HTTP` (Hyper Text Transfer Protocol).
  - `Protocol`is an established set of rules that determine
    how data is transmitted between different devices in the same network.
  - A protocol that is defined for machines to communicate.
  - Specifically for websites, it is the most common way for your website's `frontend`
    to talk to its `backend`.
  - `HTTP Server` is some code that follows the `HTTP Protocol` and is able to communicate with clients (browsers/mobile apps).

- `HTTP Client Side`

  - Things client needs to worry about

  1. Protocol (HTTP / HTTPS)
  2. Address (URL / PORT / IP)
  3. Route
  4. Headers, Body, Query Params
  5. Method

- `HTTP Server Side`

  - Things server needs to worry about

  1. Response Headers
  2. Response Body
  3. Status Code

- `Communication happens like this`

  Client -> `https://chat.openai.com/backend-api/conversation`

  - Here `https` is the protocol, chat.openai.com is the `URL`
    and backend-api/conversation is `Route`
  - `Header` - Cookie - 123@3325D3@!E223 (You send things like authetication information using `Header`)
  - `Body` - What is 4 + 4 (usually in JSON)
  - `Method` : POST
  - `Route` specifies what we are exactly trying to do.

  Sever Response

  - `Response Header`
  - `Reponse Body` - 4 + 4 is equal to 8
  - `Status Code` - 200

`Things that happen in the browser after a request is fired`

1. Browser parses the URL
2. Does the DNS lookup (converts google.com to an IP)
3. Establishes a connection to the IP (does handshake)

`What is DNS resolution?`

- Domain Name System.
- URLs are just like contacts in your phone.
- In the end, they map to an IP.
- If you ever buy a URL of your own, you will need to point it to the IP of your server.

`Things that happen in the server after a request is received`

1. You get the inputs (route, body, headers).
2. You do some logic on the input, calculate the output.
3. Return the output body, headers and status code.

`What are the common methods you send to your BE server?`

1. GET
2. POST
3. PUT
4. DELETE

### Status Codes

`What are the common status codes the backend reponds with?`

1. 200 - Everything is OK
2. 404 - Page / Route not found.
3. 403 - Authentication issues.
4. 500 - Internal Server Error.

There are many libraries that let you create HTTP Servers
and we gonna use `express`

```md
Assigment:

Creating a HTTP server from scratch in C/C++
```

### Express Basic

`Creating a simple HTTP Server using Express`

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Server Responded Back');
});

app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
});
```

`TODOS`

1. Create a todo app that lets users store todods on the server.
2. Try to create a http server from scratch in C
3. Create an http server in rust using actix-web
4. Create an http server in golang using the gurrila framework

`How servers redirects to particular website?`

- Lets's say you website is `https://nishantmohapatra.com`
- You have registered this domain with DNS provider.
- And this website is hosted in a server that has it's own IP `(12.1.1.1)` and there are many other websites are hosted there.
- Whenever you hit on that domain, the domain points to that servers's IP and your web browser sends an header called `referrer` says that this request came from `https://nishantmohapatra.com` website so the server redirects to that particular IP.

```md
NOTES:

1. A single process can only listen on a single PORT.
2. If you don't specify a protocol and your request is `https` then the default port would be `443`.
```
