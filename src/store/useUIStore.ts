import { create } from "zustand";
import { IPaymentUI, ISearchUI, QueueState, SearchState, UIState } from "../interface/UI";

export const useUIStore = create<UIState>((set) => ({
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
  query: undefined,
  setQuery: (query) => set({ query }),
  results: null,
  setResults: (results) => set({ results }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

export const useQueueStore = create<QueueState>((set) => ({
  isOpenQueue: false,
  toggleOpenQueue: (isOpenQueue) => set({isOpenQueue})
}));
