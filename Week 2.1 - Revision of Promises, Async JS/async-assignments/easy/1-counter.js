let counter = 0;

setInterval(increaseCounterByOneSec, 1000);

function increaseCounterByOneSec() {
  counter += 1;
  console.log(counter);
}
