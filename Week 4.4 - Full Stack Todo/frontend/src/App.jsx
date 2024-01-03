import { useState } from "react";
import { CreateTodo } from "../components/CreateTodo";
import { Todos } from "../components/Todos";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  fetch("http://localhost:3000/todos").then(async function (todos) {
    const json = await todos.json();
    setTodos(json.todos);
  });

  return (
    <div>
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  );
}

export default App;
