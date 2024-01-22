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
