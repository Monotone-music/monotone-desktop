import { create } from "zustand";
import { IUI } from "../interface/UI";

export const useUIStore = create<IUI>((set) => ({
    isSidebarOpen: false,
    isRightBarOpen: false,
    toggleRightBar: (isRightBarOpen) => set({isRightBarOpen}),
    toggleSidebar: (isSidebarOpen) => set({isSidebarOpen}),
  }));