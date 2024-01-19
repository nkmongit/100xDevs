import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import countAtom, { evenSelector } from "./store/atoms/count";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Count />
      </RecoilRoot>
    </div>
  );
}

function Count() {
  console.log("RE-RENDER");
  return (
    <div>
      <CountRenderer />
      <Buttons />
      <ShowEven />
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);
  return <div>{count}</div>;
}

function Buttons() {
  console.log("BUTTON RE-RENDER");
  const setCount = useSetRecoilState(countAtom);
  return (
    <div>
      <button onClick={() => setCount((curr) => curr + 1)}>Increase</button>
      <button onClick={() => setCount((curr) => curr - 1)}>Decrease</button>
    </div>
  );
}
function ShowEven() {
  const isEven = useRecoilValue(evenSelector);
  return <div>{isEven ? "It is even" : null}</div>;
}
export default App;
