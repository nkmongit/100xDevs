import { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('NISHANT');

  function changeTitle() {
    setTitle(Math.random());
  }

  return (
    <>
      <button onClick={changeTitle}>Click me to change the title</button>
      <Header title={title} />
      <Header title='LEARNING FROM THE BEST' />
    </>
  );
}

function Header({ title }) {
  console.log('re-render happened');
  return <div>{`My name is ${title}`}</div>;
}

export default App;
