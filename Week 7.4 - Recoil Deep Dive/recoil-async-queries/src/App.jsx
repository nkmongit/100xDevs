// import { useEffect } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
// import axios from "axios";
import { notifications, totalNotificationSelector } from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  // const [networkCount, setNetworkCount] = useRecoilState(notifications);
  const networkCount = useRecoilValue(notifications);
  const totalNotifications = useRecoilValue(totalNotificationSelector);

  // useEffect(() => {
  //   axios.get("https://sum-server.100xdevs.com/notifications").then((res) => {
  //     setNetworkCount(res.data);
  //   });
  // }, []);
  //
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
