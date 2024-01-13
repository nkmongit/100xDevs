import { useEffect, useState } from "react";

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://sum-server.100xdevs.com/todos").then(async function(res) {
      const json = await res.json();
      setTodos(json.todos);
    });
  }, []);

  return todos;
};

export default useTodos;
