import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IUser } from "../schemas/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

type State = {
  user: IUser | null;
};

type Actions = {
  reset: () => void;
  setUser: (user: IUser) => void;
  getUser: () => IUser | null;
};

const useUser = create<State & Actions>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: IUser) => {
        set(() => ({
          user: user,
        }));
      },
      getUser: () => {
        return get().user;
      },
      reset: () => {
        set(() => ({
          user: null,
        }));
      },
    }),
    {
      name: "state-useUser",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUser;
