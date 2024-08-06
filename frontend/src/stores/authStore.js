import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: undefined,
      setAccessToken: (accessToken) => set({ accessToken }),
      userId : undefined,
      setUserId : (userId) => set({userId})
    }),
    {
      name: "chestNut",
      storage: createJSONStorage(() => sessionStorage),
    },

  )
);

export default useAuthStore;
