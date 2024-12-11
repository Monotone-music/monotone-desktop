import { create } from "zustand";
import { IPaymentUI, ISearchUI, IUI, SearchState } from "../interface/UI";

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
  setClientSecret: (clientSecret) => set({ clientSecret }),
}));

export const useUISearch = create<ISearchUI>((set) => ({
  isOpenModal: false,
  toggleOpenModal: (isOpen: boolean) => {
    set({ isOpenModal: isOpen });
  },
}));

export const useSearchStore = create<SearchState>((set) => ({
  query: null,
  setQuery: (query) => set({ query }),
  results: null,
  setResults: (results) => set({ results }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
