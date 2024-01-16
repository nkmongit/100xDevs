import { useEffect, useState } from "react";

const UsingEffect = () => {
  const [exchangeData, setExchangeData] = useState({});
  const [bankData, setBankData] = useState({});

  console.log("hi there re-render");

  useEffect(() => {
    setTimeout(() => {
      setBankData({ income: 100 });
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setExchangeData({ returns: 100 });
    }, 1000);
  }, []);

  const incomeTax = bankData.income + exchangeData.returns * 0.3;
  return <div>hi there, your income tax returns are {incomeTax}</div>;
};

export default UsingEffect;
