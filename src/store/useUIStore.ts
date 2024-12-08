import { create } from "zustand";
import { IPaymentUI, IUI } from "../interface/UI";

export const useUIStore = create<IUI>((set) => ({
  isSidebarOpen: false,
  isRightBarOpen: false,
  toggleRightBar: (isRightBarOpen) => set({ isRightBarOpen }),
  toggleSidebar: (isSidebarOpen) => set({ isSidebarOpen }),
}));

export const useUIPayment = create<IPaymentUI>((set) => ({
  isOpenPopup: false,
  clientSecret: null,
  toggleOpenPopup: (isOpenPopup) => set({ isOpenPopup }),
  setClientSecret: (clientSecret) => set({ clientSecret })
}));
