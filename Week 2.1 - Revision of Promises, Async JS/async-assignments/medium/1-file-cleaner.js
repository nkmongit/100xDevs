const fs = require('fs');

function removeExtraSpaces(data) {
  // let newArr = data.split(' ');
  // let s = newArr.filter((val) => val != '');
  // let newString = s.join(' ');
  return data
    .split(' ')
    .filter((val) => val != '')
    .join(' ');
}
fs.readFile(
  '/home/dv1mosh/Desktop/100xDevs/Week 2.1 Async JS and Intro to Backends/async-assignments/medium/main.txt',
  'utf-8',
  function (err, data) {
    const refinedData = removeExtraSpaces(data);

    fs.writeFile(
      '/home/dv1mosh/Desktop/100xDevs/Week 2.1 Async JS and Intro to Backends/async-assignments/medium/main.txt',
      refinedData,
      function (err) {
        if (err) {
          return;
        } else {
          console.log('Successfully Done');
        }
      }
    );
  }
);
