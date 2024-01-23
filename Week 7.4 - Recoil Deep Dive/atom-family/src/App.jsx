import "./App.css";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { todos, todosAtomFamily } from "./atoms";
import { useEffect } from "react";

function App() {
  return (
    <RecoilRoot>
      <UpdaterComponent />
      <Todo id={1} />
      <Todo id={2} /> <Todo id={2} /> <Todo id={2} /> <Todo id={2} />{" "}
      <Todo id={2} /> <Todo id={2} />
      <hr />
      <TodoGet id={1} />
    </RecoilRoot>
  );
}

function Todo({ id }) {
  // const [todo, setTodo] = useRecoilState(todosAtomFamily(id));
  const todo = useRecoilValue(todosAtomFamily(id));

  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  );
}

// This would work too, but it's not efficient if we make changes in one todo
// the other todos would get affected.
function TodoGet({ id }) {
  const todo = useRecoilValue(todos);
  console.log(todo);

  return (
    <div>
      {todo.map((t, index) =>
        t.id == id ? (
          <div key={index}>
            {t.title} {t.description}
          </div>
        ) : null,
      )}
    </div>
  );
}

function UpdaterComponent() {
  const updateTodo = useSetRecoilState(todosAtomFamily(2));

  useEffect(() => {
    setTimeout(() => {
      updateTodo({
        id: 2,
        title: "NISHE TODO",
        description: "DES NEW TODO",
      });
    }, 5000);
  }, []);
}
export default App;
