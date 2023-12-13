# WEEK 1.2 (JavaScript Foundation)

## What did we study about?

- Why languages?:

`Here we are talking about programming languages and role of them, a programming language can be used to perform a certain task that a machine can do, every language has a compiler which converts the code into binary i.e 0's and 1's`

- Interepreted vs Compiled Language:

`An interpreted language runs the code line by line, while a compiled language first compiles the whole code and then run it`

- Why JS? >> Other languages:

`JavaScript is widely used on web browsers and it has already been established or you may say standarized and JavaScript can also be used for Backend Development`

- Static vs Dynamic (Loosely Typed):

`Example for Static Language - C++`

```c++
#include<iostream>
using namespace std;

int main()
{
    int num = 5; // Decalartion of an integer
    num = "Hello"; // This gives compile-time error
    // because we can't change the data type of this variable

    cout << num << endl;
    return 0;
}

```

`Example for Dynamic Language - JavaScript`

```javascript
let num = 5; // Variable initially holds a number
num = 'Hello'; // Variable holds a string
console.log(num);
```

- Single threaded nature of JS

`Let's say you have a machine that has 6 cores in your CPU, JavaScript can use only one of these at a time.`

1. This is why it is considered to be a bad language for scalabale systems.
2. But there is a way to make it use all the core of your machine.
3. More practically, JS runs line by line and only one line runs at a time.

- Simple Primitives

```md
1. Variables (let, var, const)
2. Datatypes - strings, numbers and booleans
3. if / else
```

- Complex Primitives

```md
1. Arrays
2. Objects
3. Functions
```
