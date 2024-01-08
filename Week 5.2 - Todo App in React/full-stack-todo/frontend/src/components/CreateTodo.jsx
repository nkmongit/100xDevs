import { useState } from 'react';

const CreateTodo = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  function changeTitle(e) {
    setTitle(e.target.value);
  }

  function changeDescription(e) {
    setDescription(e.target.value);
  }

  async function addTodo() {
    const data = await fetch('http://localhost:3000/todo', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const json = await data.json();
    console.log(json);
  }
  return (
    <div>
      <input
        id='title'
        style={InputStyle}
        type='text'
        placeholder='title'
        onChange={changeTitle}
      ></input>
      <br />
      <input
        id='description'
        style={InputStyle}
        type='text'
        placeholder='description'
        onChange={changeDescription}
      ></input>
      <br />

      <button onClick={addTodo} style={ButtonStyle}>
        Add a todo
      </button>
    </div>
  );
};

const InputStyle = {
  padding: 10,
  margin: 10,
  fontSize: 30,
};

const ButtonStyle = {
  margin: 20,
};

export default CreateTodo;
