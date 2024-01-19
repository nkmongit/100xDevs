import { atom, selector } from "recoil";

export const todoAtom = atom({
  key: "todoAtom",
  default: [],
});

export const filterAtom = atom({
  key: "filterAtom",
  default: "",
});

export const wordFilterSelector = selector({
  key: "wordFilterSelector",
  get: ({ get }) => {
    const filterWord = get(filterAtom);
    const todo = get(todoAtom);

    const filteredTodos = todo.filter((todo) => {
      return todo.title == filterWord || todo.description.includes(filterWord);
    });
    return filteredTodos;
  },
});
