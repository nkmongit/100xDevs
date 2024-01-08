import { useState } from 'react';
import axios from 'axios';

const Todos = (todo) => {
  const [completed, setCompleted] = useState(todo.todos.completed);

  async function getTodoId(e) {
    const id = e.target.value;
    try {
      await axios.put('http://localhost:3000/completed', {
        id: id,
      });
      setCompleted(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={TodoBoxStyle}>
      <h3>Todo Title: {todo.todos.todoTitle}</h3>
      <h5>Todo Description: {todo.todos.todoDescription}</h5>
      <button onClick={getTodoId} value={todo.todos._id} disabled={completed}>
        {completed ? 'Completed' : 'Mark as Completed'}
      </button>
    </div>
  );
};

const TodoBoxStyle = {
  border: '1px solid #fff',
  borderRadius: 10,
  margin: 5,
  padding: 5,
};

export default Todos;
