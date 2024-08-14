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
      setId: (id) => set({ id }),
      pw: undefined,
      setPw: (pw) => set({ pw }),
      pronunciation: "발음해 보세요",
      setPronunciation: (pronunciation) => set({ pronunciation }),
      checkPoint: undefined,
      setCheckPoint: (checkPoint) => set({ checkPoint }),
      
      hasVisitedBefore: false,
      setHasVisitedBefore: (value) => set({ hasVisitedBefore: value }),
    }),
    {
      name: "chestNut",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
