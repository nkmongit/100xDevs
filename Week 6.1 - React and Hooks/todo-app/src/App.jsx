import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    {
      title: 'Get a Job',
      description: 'Work hard and be consistent always',
    },
    {
      title: 'Grow as a person',
      description: 'Be positive always',
    },
    {
      title: 'Health is Wealth',
      description: 'Excercise and be puntual',
    },
  ]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  function addTodo() {
    if (title == '' || description == '') {
      return;
    }
    setTodos([
      ...todos,
      {
        id: Math.random(),
        title,
        description,
      },
    ]);
  }

  return (
    <div>
      <TodoForm setTitle={setTitle} setDescription={setDescription} />
      <button onClick={addTodo}>Add Todo</button>

      {todos.map((t, i) => (
        <Todo key={i} title={t.title} description={t.description} />
      ))}
    </div>
  );
}

function TodoForm({ setDescription, setTitle }) {
  return (
    <div>
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder='Enter title'
      />
      <br />
      <input
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        id='description'
        placeholder='Enter description'
      />
    </div>
  );
}

function Todo({ title, description }) {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <br />
    </div>
  );
}

export default App;
