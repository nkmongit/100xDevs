// ? JSON - JavaScript Object Notation

function jsonMethods(jsonString) {
  console.log('Original JSON String: ', jsonString);

  // Parsing JSON string to JavaScript object
  let parsedObject = JSON.parse(jsonString);
  console.log('After JSON.parse(): ', parsedObject);

  // Stringifying JavaScript object to JSON string
  let jsonStringified = JSON.stringify(parsedObject);
  console.log('After JSON.stringify(): ', jsonStringified);
}

const sampleJSONString =
  '{"key":"value", "number":42,"nested":{"nestedKey":"nestedValue"}}';

// jsonMethods(sampleJSONString);

const user = {
  name: 'nishant',
  age: 24,
  gender: 'male',
};

console.log(JSON.stringify(user));
