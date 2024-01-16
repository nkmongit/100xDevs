import { memo, useCallback, useEffect, useState } from "react";

const UsingCallback = () => {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});

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
      console.log("TIME OUT");
    }, 5000);
  }, []);

  const cryptoReturns = useCallback(
    function() {
      return exchange1Data.returns + exchange2Data.returns;
    },
    [exchange1Data, exchange2Data],
  );

  return (
    <div>
      <CryptoGainsCalculator cryptoReturns={cryptoReturns} />
    </div>
  );
};

const CryptoGainsCalculator = memo(({ cryptoReturns }) => {
  return (
    <div>
      Your crypto returns are, seems to getting on my nerve {cryptoReturns()}
    </div>
  );
});
export default UsingCallback;
