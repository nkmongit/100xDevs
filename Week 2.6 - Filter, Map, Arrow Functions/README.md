# WEEK 2.6 - FILTER, MAP, ARROW FUNCTIONS

## ARROW FUNCTIONS

`Simple Function Declaration`

```js
function sum(a, b) {
  return a + b;
}
const ans = sum(1, 2);
console.log(ans);
```

`Arrow Function Declaration`

```js
const sum = (a, b) => {
  return a + b;
};

const ans = sum(1, 2);
console.log(ans);
```

`There is a difference between them how this gets binded in both of em`

## MAP

```md
- Problem Statement
  Given an array, give back a new array in which every value is multiplied
  by 2
  [1, 2, 3, 4, 5]
```

```js
// WITHOUT USING MAP METHOD
const arr = [1, 2, 3, 4, 5];
const newArr = [];

for (let i = 0; i < arr.length; i++) {
  newArr.push(arr[i] * 2);
}

console.log(newArr);
```

```js
// USING MAP METHOD
const arr = [1, 2, 3, 4, 5];
const newArr = [];

arr.map((val) => {
  newArr.push(val * 2);
});
```

## FILTER

```md
- Problem Statement
  Given an array, give back all the even numbers from it
  by 2
  [1, 2, 3, 4, 5]
```

```js
// WITHOUT USING FILTER METHOD
const arr = [1, 2, 3, 4, 5];
const newArr = [];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 == 0) {
    newArr.push(arr[i] * 2);
  }
}

console.log(newArr);
```

```js
// USING FILTER METHOD
const arr = [1, 2, 3, 4, 5];
const newArr = [];

arr.filter((val) => {
  newArr.push(val % 2 === 0 ? val : null);
});

console.log(newArr);
```
