import { useState } from 'react';

function App() {
  return (
    <>
      <HeaderWithButton />
      <Header title={'my name is something somethinn'} />
    </>
  );
}

function HeaderWithButton() {
  const [title, setTitle] = useState('Nishant');

  function changeTitle() {
    setTitle('My namme is ' + Math.random());
  }

  return (
    <>
      <button onClick={changeTitle}>Click me to change title</button>
      <Header title={title} />
    </>
  );
}

function Header({ title }) {
  return <div>{title}</div>;
}

export default App;
