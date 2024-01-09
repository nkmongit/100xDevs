import { useState } from 'react';
import { memo } from 'react';

function App() {
  const [title, setTitle] = useState();
  function updateTitle() {
    setTitle('my name is ' + Math.random());
  }
  return (
    <div>
      {/* <HeaderWithButton /> */}
      <button onClick={updateTitle}>Update the title</button>
      <Header title={title} />
      <Header title='something' />
      <Header title='something' />
      <Header title='something' />
    </div>
  );
}

// function HeaderWithButton() {
//   const [title, setTitle] = useState('Nishant');

//   function changeTitle() {
//     setTitle('My namme is ' + Math.random());
//   }

//   return (
//     <>
//       <button onClick={changeTitle}>Click me to change title</button>
//       <Header title={title} />
//       <Header title={title} />
//     </>
//   );
// }

const Header = memo(function ({ title }) {
  return <div>{title}</div>;
});

export default App;
