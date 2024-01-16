import { useEffect, useMemo, useState } from "react";

const UsingMemo = () => {
  console.log("RE-RENDER FROM MEMO");
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  useEffect(() => {
    setExchange1Data({
      returns: 100,
    });
  }, []);

  useEffect(() => {
    setExchange2Data({
      returns: 200,
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setBankData({
        income: 100,
      });
    }, 1000);
  }, []);

  const cryptoReturns = useMemo(() => {
    console.log("CALCULATE THE VALUE AGAIN cryptoReturns");
    return exchange1Data.returns + exchange2Data.returns;
  }, [exchange1Data, exchange2Data]);

  const incomeTax = useMemo(() => {
    return (cryptoReturns + bankData.income) * 0.3;
  }, [bankData, cryptoReturns]);

  return <div>hi there, your income tax returns are {incomeTax}</div>;
};

export default UsingMemo;
