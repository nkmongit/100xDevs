const fs = require('fs');

fs.readFile('async-assignments/easy/main.txt', 'utf-8', function (err, data) {
  console.log(data);
});

// DOING AN EXPENSIVE TASK
let sum = 0;
for (let i = 0; i < 10000000000; i++) {
  sum += i;
}

console.log(sum);
