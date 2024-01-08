import './App.css';
import { useEffect, useState } from 'react';
import CreateTodo from './components/CreateTodo';
import Todos from './components/Todos';

function App() {
  const [todos, setTodos] = useState([
    {
      todoTitle: '1st Todo',
      todoDescription: 'Voodoo Todo',
    },
  ]);
  useEffect(() => {
    async function getTodos() {
      const todo = await fetch('http://localhost:3000/todos');
      const todoList = await todo.json();
      setTodos(todoList.todos);
    }
    getTodos();
  }, []);

  return (
    <>
      <div>Todo App</div>
      <CreateTodo />
      {todos.map((todo, index) => (
        <Todos todos={todo} key={index} />
      ))}
    </>
  );
}

export default App;
