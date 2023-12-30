# REACT FOUNDATION

`DOM Manipulation`

- DOM manipulation is very hard to write as developer.
- Making dynamic websites, with the primitives that DOM provides you is very hard.
- Primitives
  - document.createElement
  - document.appendChild
  - element.setAttribute
  - element.children

`Creating a basic Todo App using DOM Manipulation`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todo App</title>
  </head>

  <body>
    <input id="name" type="text" placeholder="Todo Name" />
    <br />
    <input id="description" type="text" placeholder="Todo Description" />
    <br />
    <button onclick="addTodo()">Add Todo</button>
    <br />
    <div id="container"></div>

    <script>
      let globalId = 1;
      function addTodo() {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        createTodos(name, description, globalId++);
      }

      function createTodos(name, description, globalId) {
        const outerDiv = document.createElement('div');
        const todoNameDiv = document.createElement('div');
        const todoDesDiv = document.createElement('div');
        const markBtn = document.createElement('button');

        todoDesDiv.innerHTML = description;
        todoNameDiv.innerHTML = name;
        markBtn.innerHTML = 'Mark as Done';

        outerDiv.appendChild(todoNameDiv);
        outerDiv.appendChild(todoDesDiv);
        outerDiv.appendChild(markBtn);
        outerDiv.setAttribute('id', globalId);

        document.getElementById('container').appendChild(outerDiv);

        markBtn.setAttribute('onclick', `markAsDone(${globalId})`);
      }

      function markAsDone(todoId) {
        document.getElementById(todoId).children[2].innerHTML = 'Done';
      }
    </script>
  </body>
</html>
```

`Problem with the above approach`

- Very hard to add and remove elements.
- No central `state`.
- What if there is a server where these todos are put?
- What if you update a Todo from your mobile app?
- You will get back the new array of TOODs on the frontend.
- How will you update the DOM then?
- You only have a `addTodo` function.
- You don't have an `updateTodo` or `removeTodo` function yet.

```json
[
  {
    "id": 1,
    "title": "Go to GYM ",
    "description": "Go to GYM from 7-9 PM"
  },
  {
    "id": 2,
    "title": "Drink Water",
    "description": "Drink water daily"
  }
]
```

If you can write a function, that takes this state as an input and creates the output on the right, that is much more powerful than our original approach.

`Better Solution`

Don't clear the DOM upfront, update it based on what has changed.

- Question is, how does it calculate what all has changed?
- Has a todo been marked as complete?
- Has a todo been removed from the backend?

You have to calculate the diff, anytime the state changes.

By remembering the old todos in a variable (Virtual DOM).

`What is the easiest way to create a dynamic frontend website?`

1. Update a state variable.
2. Delegate the task of figuring out diff to a hefty function.
3. Tell the hefty function how to add, update and remove elements.
