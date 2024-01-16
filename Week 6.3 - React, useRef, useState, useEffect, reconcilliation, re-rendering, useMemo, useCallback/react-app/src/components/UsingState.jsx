import { useState } from "react";

const UsingState = ({ Space }) => {
  const [count, setCount] = useState(0);

  const [exchangeData, setExchangeData] = useState({});
  const [bankData, setBankData] = useState({});

  setTimeout(() => {
    setBankData({ income: 100 });
  }, 3000);

  setTimeout(() => {
    setExchangeData({
      returns: Number(100),
    });
  }, 1000);

  const incomeTax = (bankData.income + exchangeData.returns) * 0.3;
  console.log(exchangeData);

  console.log(bankData);

  return (
    <div style={Space}>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>

      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease
      </button>

      <div>
        <div>hi there, your income tax returns are {incomeTax}</div>
      </div>
    </div>
  );
};

export default UsingState;
