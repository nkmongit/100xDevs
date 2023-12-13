/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  let arr = [];
  arr = [...str2];

  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (str1[i] == arr[j]) {
        arr[j] = 0;
      }
    }
  }
  console.log(arr);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != 0) {
      return false;
    }
  }
  return true;
}

isAnagram('Debit Card', 'Bad Credit');

module.exports = isAnagram;
