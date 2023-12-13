function dateMethods() {
  const currentDate = new Date();
  console.log('Current Date: ', currentDate);

  // ? Getting various components of the date
  console.log('Date: ', currentDate.getDate());
  console.log('Month: ', currentDate.getMonth() + 1); // Months are zero-indexed, so adding 1

  console.log('Year: ', currentDate.getFullYear());
  console.log('Hours: ', currentDate.getHours());
  console.log('Minutes: ', currentDate.getMinutes());
  console.log('Seconds: ', currentDate.getSeconds());

  // Setting components of the date
  currentDate.setFullYear(2022);
  console.log('After setFullYear: ', currentDate);

  currentDate.setMonth(5); // Setting month to June (zero-indexed)
  console.log('After setMonth: ', currentDate.getMonth());

  // Getting and setting time in miliseconds since 1970
  console.log('Time in miliseconds since 1970: ', currentDate.getTime());
  // epoch timestamp
}

dateMethods();

function calculateSum() {
  let a = 0;
  for (let i = 0; i < 10000; i++) {
    a = a + i;
  }
  return a;
}

calculateSum();
