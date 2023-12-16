// ARROW FUNCTION

const sum = (a, b) => {
  return a + b;
};

const ans = sum(1, 2);
console.log(ans);

// MAP
const arr = [1, 2, 3, 4, 5];
const newArr = [];

arr.map((val) => {
  newArr.push(val * 2);
});

console.log(newArr);

// FILTER

// ! WITHOUT FILTER
const arr1 = [1, 2, 3, 4, 5];
const newArr1 = [];

for (let i = 0; i < arr1.length; i++) {
  if (arr1[i] % 2 == 0) {
    newArr1.push(arr1[i] * 2);
  }
}

console.log(newArr1);

// ? WITH FILTER
const arr2 = [1, 2, 3, 4, 5];
const newArr2 = [];

arr.filter((val) => {
  newArr2.push(val % 2 === 0 ? val : null);
});

console.log(newArr2);
