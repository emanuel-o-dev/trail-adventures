import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../schemas/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

type State = {
  user: User | null;
};

type Actions = {
  reset: () => void;
  setUser: (user: User) => void;
  getUser: () => User | null;
};

const useUser = create<State & Actions>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: User) => {
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
