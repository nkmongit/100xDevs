import { useMemo, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(1);

  function increaseCounter() {
    setCount(count + 1);
  }
  let getCount = useMemo(() => {
    console.log("memo called");
    let total = -1;
    for (let i = 0; i <= num; i++) {
      total = total + i;
    }
    return total;
  }, [num]);
  return (
    <>
      <input
        onChange={(e) => {
          const n = e.target.value;
          setNum(n);
        }}
      />
      <div>Sum is {getCount}</div>
      <button onClick={increaseCounter}>Counter {count}</button>
    </>
  );
}

export default App;
