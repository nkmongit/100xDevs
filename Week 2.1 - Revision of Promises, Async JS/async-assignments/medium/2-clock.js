setInterval(giveMeCurrentTime, 1000);

function giveMeCurrentTime() {
  const d = new Date();
  let time = d.toLocaleTimeString();
  let timeNoAMPM = time.slice(0, 9);
  console.log(timeNoAMPM);
  console.log(time);
}
