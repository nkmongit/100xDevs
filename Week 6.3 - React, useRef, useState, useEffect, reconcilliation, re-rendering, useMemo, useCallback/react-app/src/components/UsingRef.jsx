import { useEffect, useRef } from "react";
const UsingRef = () => {
  const divRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      divRef.current.innerHTML = "10";
    }, 5000);
  }, []);

  const incomeTax = 20000;

  return (
    <div>
      Hi there, your income tax returns are <div ref={divRef}>{incomeTax}</div>
    </div>
  );
};

export default UsingRef;
