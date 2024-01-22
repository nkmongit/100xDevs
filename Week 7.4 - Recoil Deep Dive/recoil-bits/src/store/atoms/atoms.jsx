import { atom, selector } from "recoil";

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
