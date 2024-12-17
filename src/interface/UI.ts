export interface UIState {
  isSidebarOpen: boolean;
  isRightBarOpen: boolean;
  toggleRightBar: (isRightBarOpen:boolean) => void;
  toggleSidebar: (isSidebarOpen:boolean) => void;
}

export interface ITabArr {
  title: string;
  component: React.ReactNode
}

export interface IImageAlbum {
  dimensions: {
    height: number;
    width: number;
  } ;

  filename: string;
  hash: string;
  mimeType: string;
  size: number;
  type: string;
  _id: string;
}


export interface IPaymentUI{
  isOpenPopup: boolean;
  clientSecret: string | null;
  toggleOpenPopup: (isOpenPopup:boolean) => void;
  setClientSecret: (clientSecret:string) => void;
}


export interface ISearchUI{
  isOpenModal: boolean;
  toggleOpenModal: (isOpenModal: boolean) => void
}

export interface SearchState {
  query: string | null;
  setQuery: (query: string) => void
  results: any | null
  setResults: (results: any) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export interface QueueState {
  isOpenQueue: boolean;
  toggleOpenQueue: (isOpenQueue: boolean) => void;
}