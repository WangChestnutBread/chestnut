import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useLocalAuthStore = create(
  persist(
    (set) => ({
      hasVisitedBefore: false,
      setHasVisitedBefore: (value) => set({ hasVisitedBefore: value }),
      resetHasVisitedBefore: () => set({ hasVisitedBefore: false }),
    }),
    {
      name: "chestNutLocalStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLocalAuthStore;
