import { RecoilRoot, useRecoilValue } from "recoil";

import { useMemo } from "react";
import "./App.css";
import {
  jobsAtom,
  messagingAtom,
  networkAtom,
  notificationAtom,
  totalNotificationSelector,
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

  // making use of `selectors` for calculating the values
  const total = useRecoilValue(totalNotificationSelector);

  // making use of `useMemo` for calculating the values
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
      <button>Me ({total})</button>
    </div>
  );
}
export default App;
