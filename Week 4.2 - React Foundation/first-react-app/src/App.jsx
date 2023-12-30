import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Could not fetch from backend', error));
  }, []);

  const handleCompleteTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className='container'>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div
            className={todo.completed ? 'todo-item completed' : 'todo-item'}
            key={todo.id}
          >
            <div className='todo-title'>
              <span>Todo Title: </span>
              <span>{todo.title}</span>
            </div>
            <div className='todo-description'>
              <span>Todo Description: </span>
              <span>{todo.description}</span>
            </div>
            {!todo.completed && (
              <button onClick={() => handleCompleteTodo(todo.id)}>
                Complete
              </button>
            )}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
