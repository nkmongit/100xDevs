const fs = require('fs');

let somethingToWrite = 'SOME MORE DATA';
fs.writeFile(
  'async-assignments/easy/main.txt',
  somethingToWrite,
  function (err) {
    if (err) {
      console.log(err);
    }
  }
);

fs.readFile('async-assignments/easy/main.txt', 'utf-8', function (err, data) {
  console.log(data);
});
