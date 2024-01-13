import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUser] = useState([]);
  const [todos, setTodos] = useState([]);
  // fetching todo id
  const [todoId, setTodoId] = useState(1);
  const [todoData, setTodoData] = useState();

  const [btn, setBtn] = useState();
  const [btnData, setBtnData] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        "https://random-data-api.com/api/v2/users?size=5",
      );
      const json = await data.json();
      setUser(json);
    }
    fetchData();
  }, []);

  // another useEffect to fetch todos
  useEffect(() => {
    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      setTodos(res.data.todos);
    });
  }, []);

  // get todo by id
  useEffect(() => {
    axios
      .get(`https://sum-server.100xdevs.com/todo?id=${todoId}`)
      .then((response) => {
        setTodoData(response.data.todo);
      });
  }, [todoId]);

  useEffect(() => {
    axios
      .get(`https://sum-server.100xdevs.com/todo?id=${btn}`)
      .then((response) => {
        setBtnData(response.data.todo);
      });
  }, [btn]);

  console.log(todoData);
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          <div>{user.email}</div>
          <div>{user.username}</div>
        </div>
      ))}

      <h1>Todos</h1>

      {todos.map((todo) => (
        <div key={todo.id}>
          <div>{todo.title}</div>
          <div>{todo.description}</div>
        </div>
      ))}

      <div>
        <h1>Fetch Todo With ID</h1>
        <input
          onChange={function(e) {
            const val = e.target.value;
            console.log(typeof val);

            val == undefined || val == "" || val == 0 || val >= 12
              ? setTodoId(1)
              : setTodoId(val);
          }}
        />

        <div>{todoData.title}</div>
        <div>{todoData.description}</div>
      </div>

      <div>
        <h1>Fetch Data with Buttons</h1>
        <button
          onClick={() => {
            setBtn(1);
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            setBtn(2);
          }}
        >
          2
        </button>{" "}
        <button
          onClick={() => {
            setBtn(3);
          }}
        >
          3
        </button>{" "}
        <button
          onClick={() => {
            setBtn(4);
          }}
        >
          4
        </button>{" "}
        <button
          onClick={() => {
            setBtn(5);
          }}
        >
          5
        </button>{" "}
        <div>
          <div>{btnData.title}</div>
          <div>{btnData.description}</div>
        </div>
      </div>
    </>
  );
}

export default App;
