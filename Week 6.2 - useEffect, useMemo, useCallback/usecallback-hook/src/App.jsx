import { memo, useCallback, useState } from "react";

import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  // re-render won't happen for this
  var a = 1;

  // re-render will happen for these
  var arr = [];
  var obj = {};
  var fn = function() { };

  // function with useCallback
  var fnWithCall = useCallback(function() {
    console.log("call from callback");
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Counter ({counter})
      </button>
      <Demo a={a} />
      <ArrayDependency arr={arr} />
      <ObjectDependency obj={obj} />
      <FunctionDependency fn={fn} />
      <FunctionWithUseCallback fnWithCall={fnWithCall} />
    </div>
  );
}

const Demo = memo(function({ a }) {
  console.log("re-render");
  return <div>Hi there!</div>;
});

const ArrayDependency = memo(function({ arr }) {
  console.log("re-render array");
  return <div>Array Dependency check console if re-render happens</div>;
});

const ObjectDependency = memo(function({ obj }) {
  console.log("re-render object");
  return <div>Object Dependency check console if re-render happens</div>;
});

const FunctionDependency = memo(function({ fn }) {
  console.log("re-render function");
  return <div>Function Dependency check console if re-render happens</div>;
});

const FunctionWithUseCallback = memo(function({ fnWithCall }) {
  console.log("re-render function with useCallback");
  return <div>Function with useCallback hook</div>;
});
export default App;
