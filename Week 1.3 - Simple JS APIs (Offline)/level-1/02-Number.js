// ? Number Handbook

console.log('Number Handbook' + '\n');

// parseInt()
// ? This method is used to parse the values into integer type
// ? that means explicitly converting the values into integer type
// ? And it is a global function, can be called from anywhere

function explainParseInt(value) {
  console.log('parseInt() method');
  console.log(`Orginal Value: ${value} and it's type ${typeof value}`);
  let result = parseInt(value);
  console.log(`After parseInt: ${result} and it's type ${typeof result} \n`);
}
explainParseInt('42');
explainParseInt('42px');
explainParseInt('3.14');

// parseFloat()
// ? This method is same as the parseInt() method, but it does not omit the
// ? decimal value data whereas there's a chance of data loss while
// ? parsing the data with just parseInt()

function explainParseFloat(value) {
  console.log('parseFloat() method');
  console.log(`Original Value: ${value} and it's type ${typeof value}`);
  let result = parseFloat(value);
  console.log(`After parseFloat: ${result} and it's type ${typeof result} \n`);
}
explainParseFloat('42');
explainParseFloat('42px');
explainParseFloat('3.14');
