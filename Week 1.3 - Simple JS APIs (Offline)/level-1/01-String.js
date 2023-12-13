// ? String Handbook

// ! String: length, indexOf(), lastIndexOf(), slice(), substring(), replace()
// ! split(), trim(), toUpperCase(), toLowerCase(), etc

console.log('String Handbook' + '\n');

// Length
// ? It returns the length of the string, it counts downs all the characters in the string
// ? and returns the value

function getLength(str) {
  console.log('length() method');
  console.log('Original String: ', str);
  console.log('Length: ', str.length + '\n');
}
getLength('Hello JavaScript');

// indexOf()
// ? You can pass certain string or character, and it compares
// ? it with the original string and returns the first index position of that value

function findIndexOf(str, target) {
  console.log('indexOf() method');
  console.log('Orginal String: ', str);
  console.log('Target String: ', target);
  console.log('Index: ', str.indexOf(target));
  console.log();
}
findIndexOf('Hello World', 'World');
findIndexOf('Hello World World World', 'World');

// lastIndexOf()
// ? You can pass certain string or character, and it compares it with
// ? the original string returns the last index position of that value

function findLastIndexOf(str, target) {
  console.log('lastIndex() method');
  console.log('Original String: ', str);
  console.log('Target String: ', target);
  console.log('Last Index: ', str.lastIndexOf('World'));
  console.log();
}
findLastIndexOf('Hello World World World', 'World');

// slice()
// ? This method takes three arguments, first string, second the start index, third end index
// ? it will print the values between the start index till the end but excluding 'end index'

function getSlice(str, start, end) {
  console.log('slice() method');
  console.log('Original String: ', str);
  console.log(str.slice(start, end));
  console.log();
}
getSlice('Hello World', 2, 5);

// ! Custom implementation of substr()

function cutIntoSlices(str, start, end) {
  let newStr = '';
  console.log('CUSTOM slice() method');
  for (let i = 0; i < str.length; i++) {
    if (i >= start && i < end) {
      newStr = newStr + str[i];
    }
  }

  return newStr;
}

console.log(cutIntoSlices('Hello', 0, 3) + '\n');

// substr()
// ? This method is somewhat like slice() but it has been depreceated
// ? Difference between substr and slice is, that slice will only return the values
// ? Between the given start index to (end index - it takes the index position value)
// ? But with subtr it the parameter start will take the index position, and will
// ? print values till the end value

function getSubstring(str, start, end) {
  console.log('substr() method');
  console.log('Orginal String: ', str);
  console.log(str.substr(start, end) + '\n');
}
getSubstring('Hello World', 2, 5);

// replace()
// ? This method takes two arguments target string that you want to replace
// ? and replacement string that you wanna replace with target one

function replaceString(str, target, replacement) {
  console.log('replace() method');
  console.log('Original String: ', str);
  console.log('After replace: ', str.replace(target, replacement) + '\n');
}
replaceString('Hello World', 'World', 'JavaScript');

// split()
// ? This method takes an separator / dilimeter and a limit, separator can be anything
// ? a character, symbol or string according to the separator
// ? the method will divide the words and return that into an array.
// ? limit is optional it gives the number of splits

function splitString(str, separator) {
  console.log('split() method');
  console.log('Original String: ', str);
  let arr = str.split(separator);
  console.log('Returned array of words: ');
  console.log(arr);
  console.log('\n');
}
splitString('Hello, Nishant welcome to the JavaScript, World.', ',');

// trim()
// ? Thiis method is used to remove all the spaces around any string
// ? whether it be from start or end, but not from between

function trimString(str) {
  console.log('trim() method');
  console.log('Orginal String: ', str);
  console.log(str.trim() + '\n');
}
trimString('         NISHANT          MOHAPATRA          ');

// toLower();

// toUpper();
