// Write a program to greet people with first name and last name
function greet(firstName, lastName) {
  console.log(`Heyyy! Welcome to Cohort 2.0 ${firstName} ${lastName}`);
}

// greet('Nishant', 'Mohapatra');

// Write a program to greet a person according to the gender
function greetAccordingToGender(firstName, lastName, gender) {
  if (gender.toLowerCase() === 'male') {
    console.log(`Heyyy! Welcome to Cohort 2.0, Mr. ${firstName} ${lastName}`);
  } else {
    console.log(`Heyyy! Welcome to Cohort 2.0, Mrs. ${firstName} ${lastName}`);
  }
}

// greetAccordingToGender('Nishant', 'Mohapatra', 'Male');

// Write a program count from 0 to 1000 and print the sum
function sumOf0To1000() {
  let sum = 0;
  for (let i = 0; i <= 1000; i++) {
    sum = sum + i;
  }
  console.log(sum);
}

sumOf0To1000();
