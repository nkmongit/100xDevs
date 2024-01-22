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
></button>;
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
    const total =
      get(networkAtom) +
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
