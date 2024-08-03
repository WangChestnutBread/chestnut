import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: undefined,
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: "chestNut",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
