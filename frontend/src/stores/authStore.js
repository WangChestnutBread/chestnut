import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: undefined,
      setAccessToken: (accessToken) => set({ accessToken }),
      userId: undefined,
      setUserId: (userId) => set({ userId }),
      manager: undefined,
      setManager: (manager) => set({ manager }),
      id: undefined,
      setId: (id) => set({id}),
      pw: undefined,
      setPw: (pw) => set({pw})
    }),
    {
      name: "chestNut",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
