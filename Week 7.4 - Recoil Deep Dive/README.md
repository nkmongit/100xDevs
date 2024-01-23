# WEEK 7.4 - RECOIL DEEP DIVE

## BASIC

- Atoms
- selectors
- Asynchronous Data Queries
- useRecoilState
- useSetRecoilState

## ADVANCE

- atomFamily
- selectorFamily
- useRecoilStateLoadable
- useRecoilValueLoadable

### Atoms

Lets take an example of `Linkedin` navbar which has elements like `Home`,
`My Network`, `Jobs`, `Messaging`, `Notifications`. These above are the dynamic
parts of the `Linkedin` because these change.

Which will have atoms like `networkCount` for `My Network`, `jobsCount` for
`Jobs`, `messagingCount` for `Messaging`, and `notificationCount` for
`Notification`.

We have two ways to store these variables, one way is making use of `useState`
and `atoms`.

To convert this app to have the state management using the `recoil`, first
create a file called `atoms.jsx`, you can name anything but here we will store
all the atoms inside.

Then inside the `atoms.jsx` we can create all the atoms variables that we
required.

```js
import { atom } from "recoil";

export const networkAtom = atom({
  key: "networkAtom",
  default: 104,
});
export const jobsAtom = atom({
  key: "jobsAtom",
  default: 16,
});
export const notificationAtom = atom({
  key: "notificationAtom",
  default: 0,
});
export const messagingAtom = atom({
  key: "messagingAtom",
  default: 4,
});
```

Here we have defined the atoms and all it's `key` and `default` value. Now to
use these values inside our components we have to import these and make use of
hooks provided by `Recoil`.

```js
import { RecoilRoot, useRecoilValue } from "recoil";
import "./App.css";
import {
  jobsAtom,
  messagingAtom,
  networkAtom,
  notificationAtom,
} from "./store/atoms/atoms";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}
function MainApp() {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const messagingNotificationCount = useRecoilValue(messagingAtom);
  const jobsNotificationCount = useRecoilValue(jobsAtom);
  const notificationCount = useRecoilValue(notificationAtom);
  return (
    <div>
      <button>Home</button>
      <button>
        My Network (
        {networkNotificationCount > 99 ? "99+" : networkNotificationCount})
      </button>
      <button>
        Jobs ({jobsNotificationCount > 99 ? "99+" : jobsNotificationCount})
      </button>
      <button>
        Messaging (
        {messagingNotificationCount > 99 ? "99+" : messagingNotificationCount})
      </button>
      <button>
        Notifications ({notificationCount > 99 ? "99+" : notificationCount})
      </button>
      <button>Me</button>
    </div>
  );
}
export default App;
```

Here if we want to update the state of the `messagingCount` we can make use of
the hook provided by the `Recoil` i.e `useSetRecoilState` where it provides us
with a function for making changes in the respective atom you have passed inside
the `useSetRecoilState`.

```js
const setMessagingNotificationCount = useSetRecoilState(messagingCount);
<button
  onCLick={() => {
    setMessagingNotificationCount((count) => count + 1);
  }}
>
</button>;
```

Here we did the same for updating the message notification.

Lets say you want to show all notification counts above your avatar.

The not so ugly way would be:

```js
const totalCount = useMemo(() => {
  return (
    Number(networkNotificationCount) +
    Number(messagingNotificationCount) +
    Number(jobsNotificationCount) +
    Number(notificationCount)
  );
}, [
  networkNotificationCount,
  jobsNotificationCount,
  notificationCount,
  messagingNotificationCount,
]);

<button>Me ({totalCount})</button>;
```

The better way would be:

### Selectors

The `Recoil` gives something similar to this tatt we can use to perform certains
calculations and changes those are `selectors`.

A `selector` is derived from other atoms.

```js
export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const total = get(networkAtom) +
      get(jobsAtom) +
      get(notificationAtom) +
      get(messagingAtom);

    return total;
  },
});
```

This is how you would define the `selector` where we are using the `get` method
to read the values from other `atoms` and do the calculations on it.

We also have access to the `set` method which is used for writing into atoms,
that we will look later on.

### Asynchronous Data Queries

Lets build this Appbar component (values coming from backend)

We will hit the backend with this url
`https://sum-server.100xdevs.com/notifications` and update the values with the
returned values from the backend.

First we are going to define the `atoms` and `selectors` for the application we
want to build.

```js
import { atom, selector } from "recoil";

export const notifications = atom({
  key: "notifications",
  default: {
    network: 4,
    jobs: 6,
    messaging: 3,
    notifications: 3,
  },
});

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const allNotifications = get(notifications);
    return (
      allNotifications.network +
      allNotifications.jobs +
      allNotifications.messaging +
      allNotifications.notifications
    );
  },
});
```

Now we have a `notifications` atom that consist of the default values taht we
are getting from the backend using that URL. And we have craeted a selector
called `totalNotificationSelector` which does the job of getting the values from
the `notifications` atom and calculates all the values and returns the total
count.

Now to use this in our application we have incorporate the values in our
components using the hooks provided by the `Recoil` state management tool.

```js
import { useEffect } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { notifications, totalNotificationSelector } from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  const [networkCount, setNetworkCount] = useRecoilState(notifications);
  const totalNotifications = useRecoilValue(totalNotificationSelector);

  useEffect(() => {
    axios.get("https://sum-server.100xdevs.com/notifications").then((res) => {
      setNetworkCount(res.data);
    });
  }, []);

  return (
    <>
      <button>Home</button>
      <button>
        My Network ({networkCount.network >= 100 ? "99+" : networkCount.network}
        )
      </button>
      <button>
        Jobs ({networkCount.jobs >= 100 ? "99+" : networkCount.jobs})
      </button>
      <button>
        Messaging (
        {networkCount.messaging >= 100 ? "99+" : networkCount.messaging})
      </button>
      <button>
        Notifications (
        {networkCount.notifications >= 100 ? "99+" : networkCount.notifications}
        )
      </button>

      <button>Me ({totalNotifications})</button>
    </>
  );
}

export default App;
```

Though this is not the right way to do `async queries` in `Recoil`, because we
can see that whenever we are realoading our web the `useEffect` refetches the
values from the backend, and we see that for those seconds we get to see the
`default` values that were in our `atoms`, so this makes it inconsistent.

To make it more evident we can make the backend call using the `selectors` in
our state management.

```js
import { atom, selector } from "recoil";
import axios from "axios";
export const notifications = atom({
  key: "notifications",
  default: selector({
    key: "networkSelector",
    get: async () => {
      const res = await axios.get(
        "https://sum-server.100xdevs.com/notifications",
      );
      return res.data;
    },
  }),
});

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const allNotifications = get(notifications);
    return (
      allNotifications.network +
      allNotifications.jobs +
      allNotifications.messaging +
      allNotifications.notifications
    );
  },
});
```

- In this modified code we haave defined a `selector` inside the `notifications`
  atom where we the default key has the selector defined, where it is making
  async call to the backend, which has a key and a get method, in the `get`
  method we are calling our backend and returning the data from the backend.

- Now we have to remove the `useEffect` hoook from our component and jsut use
  the returned values from the `notifications` atom.

- But this causes another problem i.e we see the screen gets flashed as white
  when we are reloading it that we can't see but if we add an artificial delay
  before fetching the data from backend we can see the white flash.

- To add the artificial delay we can add the following line before or fetch
  request `await new Promise((r) => setTimeout(r, 5000))`

- To not see white flash we can rather we use a loading component or that would
  show loading till we have our data from teh backend.

### atomFamily

`Problem` : Sometimes you need more than one atom for your use case.

For example - craeting a todo application.

```text
Question - Create a component that takes a todo id as input, and renders the TODO.

You need to store the Todo in an atom (can't use useState)

All the TODOs can be hardcoded as a variable.
```

```json
{
  "todo": {
    "id": 2,
    "title": "Todo 2",
    "description": "This is a todo",
    "completed": false
  }
}
```

- Would you have a single atom?
- Would you have one atom per todo?
- How would you create (and delete) todos dynamically?

The problem here is that atom works when only one element is present in it. Here
we are trying to use the `<Todo/>` component and passing the id for the todos
like this `<Todo id={1}/>` and `<Todo id={2} />`, the problem here is how do you
dynamically create `atoms`.

We can do like this where we define a todo:

```js
const todoAtom = atom({
  key: "todoAtom",
  default: {
    id: 1,
    title: "Go to gym",
    description: "Hit the gym",
  },
});
```

Now the problem with this `atom` is that we are passing that one todo only and
this is not dynamic. Here we would have to create different atoms for different
components.

`How would you solve this?`

Using the `atomFamily`, rather than subscribing to the `atom` we would subscribe
to the `atomFamily` this basically means whenever you know there's multiple
atoms, that we have create one `atom` per `item`, we create an `atomFamily`.

The `atomFamily` says whenever a `component` needs a new atom from the
`atomFamily` or an `atom` specific to that `component` that will give the input
to the `atomFamily` and it will give the output / return the specific atom.

And this how you would dynamically create more and more atoms for use case like
this.

```js
export const todos = atom({
  key: "todos",
  default: TODOS,
});
```

```js
function TodoGet({ id }) {
  const todo = useRecoilValue(todos);
  console.log(todo);

  return (
    <div>
      {todo.map((t, index) =>
        t.id == id
          ? (
            <div key={index}>
              {t.title} {t.description}
            </div>
          )
          : null
      )}
    </div>
  );
}
```

This would work but it won't be sufficient enough to because if we make changes
to one todo, it will re-render other todos too.

So the better approach would be adding an `atomFamily`, which will have the
logic for adding the todos dynamically and provide the todos that are needed,
and update them without affecting the other atoms.

```js
export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  default: (id) => {
    return TODOS.find((x) => x.id === id);
  },
});
```

In the above code we have defined an `atomFamily` where in the default value we
are using the `TODOS` array where we are finding the todos whih have the passed
`id` and returning it the the default value.

```js
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
```

Now with this we ahve passed down the `id` as props and passing it to the
`todosAtomFamily` that we created in our `atoms.js`.

What it does is we pass the only todo id we need to render and the
`todosAtomFamily` gives the atom that we need, not the whole.

Basically the `atomFamily` function returns a function i.e an `atom`, to see
whether this actually works and we don't get any re-renders even if any of the
todo get changes that means any changes to the todoAtom i.e being returned from
the `todosAtomFamily`.

We would make use of `useEffect` hook and `setTimeout` to update our todo with
id `2` after 5 seconds and lets see if the todos with the id `2` passed in them,
all of them re-renders or just one gets re-render and other values gets.

### selectorFamily

In the TODO application, lets say you are supposed to get TODOs from a server.

`https://sum-server.100xdevs.com/todo?id=1`

We could do something like this:

```js
export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  default: selector({
    key: "todosSelector",
    get: async function ({ get }) {
      const res = await axios.get(
        `https://sum-server.100xdevs.com/todo?id=${id}`,
      );
      return res.data.todo;
    },
  }),
});
```

We can do an async task in a `selector` but here the problem is it's a dynamic
selector needs to return different value given a different input, that `id`
field is dynamic.

Now to solve this problem we would use the `selectorFamily`

```js
export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  default: selectorFamily({
    key: "todosSelectorFamily",
    get: function (id) {
      return async function ({ get }) {
        const res = await axio.get(
          `https://sum-server.100xdevs.com/todo?id=${id}`,
        );
        return res.data.todo;
      };
    },
  }),
});
```

### useRecoilStateLoadable & useRecoilValueLoadable

`What happens when the values aren't loaded immediately?`

- For example, the TODOs that are coming back from the server?

- How can we show loader on screen when that happens rather than an empty state?

We gonna wrap our atoms with these `Loadable` hooks that `Recoil` provides us
with, this becomes very handy.

Then the loadable function returns an object called `state` where if resolved
and we have the values from the backend it would have the state as `hasValue`,
if the `state` is in `loading` we could render a `skeleton` or a `loading`
component, it also has the value called `hasError` where the promise from our
backend has returned an error.

```js
function Todo({ id }) {
  const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id));
  if (todo.state === "loading") {
    return <div>loading</div>;
  } else if (todo.state === "hasValue") {
    return (
      <>
        {todo.contents.title}
        {todo.contents.description}
        <br />
      </>
    );
  } else if (todo.state === "hasError") {
    return <div>Error while getting data from backend</div>;
  }
}
```
