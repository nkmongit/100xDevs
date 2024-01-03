import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button count={count} setCount={setCount} />
    </div>
  );
}

function Button({ count, setCount }) {
  function onButtonClick() {
    setCount(count + 1);
  }
  return <button onClick={onButtonClick}>Counter {count}</button>;
}

export default App;
