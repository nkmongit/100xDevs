/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  if (str == '' || str.length == 1) {
    return true;
  }

  const punctRE =
    /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;

  str = str.replace(punctRE, '');

  let flag = false;
  let last = str.length - 1;
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i].toLowerCase() == str[last].toLowerCase()) {
      flag = true;
    }
  }
  return flag;
}

// console.log(isPalindrome('Able, was I ere I saw Elba!'));
module.exports = isPalindrome;
