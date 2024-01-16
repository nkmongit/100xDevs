# WEEK 6.3 - React, useRef, useState, useEffect, Reconcilliation, re-rendering, useMemo, useCallback

## Reconcilliation

Lets take a scenario : `You have a CA that files your tax returns`

1. You give him all your bank info/demat info/job info/pan card.
2. They `reconcile` all deposits/withdrawls/interest gains.
3. They tell you final revenue, expense and profits.

`Similarly in React`

1. You give all your state.
2. React takes it and reconciles it.
3. Then it re-renders the whole state (DOM).

`Working of a CA`

```text
Can you do taxes yourself - Yes
Should you do them yourself - No
Is it good for you to delegate the heavy taks of calculationg taxes to CA - Yes
What do you give to the CA - Your bank information
How often does the CA re-compute taxes - Once a year
Does the CA have tricks to make calculation faster - Yes
```

`Working of the React`

```text
Can you do DOM manipulation yourself - Yes
Should you do it yourself - No
Is it good for you to delegate the heavy task of calculating the DOM changes to React - Yes
What do you give to React - The State
How often does react re-render - Any time the state changes
Does React have tricks to make calculation faster - Yes
```

## useState

```js
import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

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
    </div>
  );
}

const Space = {
  display: "flex",
  gap: 16,
};
export default App;
```

In the above code we have used the `useState` hook for our count variable, the
`useState` hook has given us back an array where the first element is a variable
and other one is a function.

Any changes reflect on while changing the `count` variable using the `setCount`
function the React is constantly looking for changes in the state, so it can do
manipulation BTS.

Rendering here means it will call the function again.

## useEffect

Taking the previous scenario again:
`How do you get all the docs needed to submit to your CA?`

More importantly, how many times do you get the same docs?

When you're filing taxes, you might need to get your data from various sources
before you give it to your CA (side effects)

1. You might have to wait for 10 days before you can talk to your bank manager
   (setTimeout)
2. You might have to go to your exchange broker's office to get your trading
   information.

You will update your CA with this information as you get it.

`Q: Will you, in any case, do any of these more than once in a single year?`

But in below example, we are trying to set the data every 3 seconds and than
again changing the state. This causes re-rendering the DOM again and again.

```js
import { useState } from "react";

function App() {
  const [exchangeData, setExchangeData] = useState({});
  const [bankData, setBankData] = useState({});

  setTimeout(() => {
    setBankData({ income: 100 });
  }, 3000);

  setTimeout(() => {
    setExchangeData({
      returns: 100,
    });
  }, 1000);

  const incomeTax = (bankData.income + exchangeData.returns) * 0.3;

  return <div>hi there, your income tax returns are {incomeTax}</div>;
}
```

To overcome this problem of `re-rendering` we use the hook called `useEffect`
hook where we explicitly tell the React, when to set the data using the
setTimeout() function, where `useEffect()` hook gives us a dependency array,
where we let React know when to set the data.

Basically if you want to guard some code, when the component mounts, which means
the first time it re-renders.

Then we need to run the setTimeout() for both setting the exchange data and
settting the bank data.

```js
import {useEffect, useState} = 'react';

function App() {
  const [exchangeData, setExchangeData] = useState({});
  const [bankData, setBankData] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setBankData({income: 100})
    }, 2000)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setExchangeData({returns: 100})
    }, 1000)
  }, [])


  const incomeTax = (bankData.income + exchangeData.returns) * 0.3;

  return (
    <div>hi there, your income tax returns are {incomeTax}</div>
  )
}
```

## useMemo

Lets take a scenario again:

- Let's say you have yoour crypto stored in 3 different exchanges
  (CoinDCX/WazrirX/Binance).
- You got the returns from all three places.
- You added them and gave it to the CA.
- Now you got your income report.
- `Will you re-calculate the sum of all the crypto returns?`

`Will look at the code now:`

```js
const UsingMemo = () => {
  console.log("RE-RENDERS");
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
        income: 200,
      });
    }, 1000);
  }, []);

  const cryptoReturns = useMemo(() => {
    return exchange1Data.returns + exchange2Data.returns;
  }, [exchange1Data, exchange2Data]);

  const incomeTax = useMemo(() => {
    return (cryptoReturns + bankData.income) * 0.3;
  }, [bankData, cryptoReturns]);
  return <div>hi there, your income tax returns are {incomeTax}</div>;
};
```

In the above code we are using `useMemo()` hook to calculate the `cryptoReturns`
and `incomeTax` as they both are somehow are big calculations that needs to be
done, but not everytime we calculate these once and not re-render our whole
application.

And the `cryptoReturns` depends upon two states `exchange1Data` and
`exchange2Data` where it checks whether the value these both state variable has
changed or not, if it is changed then it will re-render.

And then the `incomeTax` variable depends on the `bankData` state variable and
value returned from `cryptoReturns`.

With the help of `useMemo` hook we are saving these calculations to re-render
our components again and again.

## useCallback

If you ever want to `memoize` a function, we use `useCallback`. By using the
`useCallback` hook we wrap the functions where they are doing an expensive task,
we don't have to make our app to re-render for every calculations even if the
state values haven't changed, so we can wrap the component using `React.memo`
where we are passing the return value what `useCallback` returns and pass it to
the component which is wrapped into `React.memo` so the component does not
re-render utntil the state variables changed.

```js
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
    function () {
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
```

## useRef

The `useRef` hook lets you access to the DOM elements. The way we used to access
the DOM elementsby using `document.getElementById()`, but why do we need this?

Lets understand it by taking an example:
`Let's say you want to do some tax evasion`

- You want to to override what your CA calculated as your income tax.
- How would you do it? You would report an incorrect value to the goverment.

```js
import { useEffect, useRef } from "react";

function UsingRef() {
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
}
```
