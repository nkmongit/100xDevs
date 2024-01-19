import { useState } from "react";
import "./App.css";
import { filterAtom, todoAtom, wordFilterSelector } from "./store/atoms/todo";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Todos />
        <InputTodos />
        <FilterTodos />
      </RecoilRoot>
    </div>
  );
}

function InputTodos() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const setTodo = useSetRecoilState(todoAtom);

  return (
    <div>
      <input
        style={InputStyle}
        onInput={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Enter the title"
      />
      <br />
      <input
        style={InputStyle}
        onInput={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Enter the description"
      />
      <br />
      <button
        onClick={() => {
          setTodo((curr) => [...curr, { title, description }]);
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

function Todos() {
  const todos = useRecoilValue(todoAtom);
  return (
    <div>
      {todos.length == 0 ? (
        <div>No Todos Yet</div>
      ) : (
        todos.map((todo, index) => (
          <div key={index}>
            <div>
              <strong>Title:</strong> {todo.title}
            </div>
            <div>
              <strong>Description:</strong> {todo.description}
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
function FilterTodos() {
  const setFilterWord = useSetRecoilState(filterAtom);
  const filteredTodos = useRecoilValue(wordFilterSelector);
  const setTodo = useSetRecoilState(todoAtom);

  return (
    <div>
      <input
        style={InputStyle}
        onInput={(e) => {
          setFilterWord(e.target.value);
        }}
        placeholder="Enter the filter"
      />
      <br />
      <button
        onClick={() => {
          setTodo(filteredTodos);
        }}
      >
        Filter Now
      </button>
    </div>
  );
}
const InputStyle = {
  padding: 12,
  margin: 12,
};
export default App;
