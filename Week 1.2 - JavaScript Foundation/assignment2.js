// Print all the even numbers inside an array

let nums = [1, 2, 3, 4, 5, 6, 7, 8];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 == 0) {
    // console.log(nums[i]);
  }
}

// Biggest number in an array
let nums1 = [2, 7, 8, 11, 9, 10];
let i = 0;
let val = Number.MIN_VALUE;
while (i != nums1.length) {
  if (nums1[i] > val) {
    val = nums1[i];
  }
  i++;
}
console.log(`Highest value ${val}`);

// prints all the male people first name given a complex object
const personInfo = [
  {
    firstName: 'Rahul',
    gender: 'Male',
  },
  {
    firstName: 'Shivani',
    gender: 'Female',
  },
  {
    firstName: 'Abhishek',
    gender: 'Male',
  },
  {
    firstName: 'Supa',
    gender: 'Male',
  },
];

for (let i = 0; i < personInfo.length; i++) {
  if (personInfo[i].gender.toLowerCase() === 'male') {
    console.log(personInfo[i].firstName);
  }
}

// Write a program that reverses all the elements of an array
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 4, 5, 6, 7];
let last = arr2.length - 1;
for (let i = 0; i < arr2.length / 2; i++) {
  let temp = arr2[last];
  arr2[last] = arr2[i];
  arr2[i] = temp;
  last--;
}

console.log(arr2);
