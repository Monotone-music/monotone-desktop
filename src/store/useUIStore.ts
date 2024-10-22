import { create } from "zustand";
import { IUI } from "../interface/UI";




export const useUIStore = create<IUI>((set) => ({
    isSidebarOpen: false,
    isRightBarOpen: true,
    toggleRightBar: () => set((state) => ({ isRightBarOpen: !state.isRightBarOpen })),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  }));