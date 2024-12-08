export interface IUI {
    isSidebarOpen: boolean; 
    isRightBarOpen: boolean;
    isModalOpen?: boolean; 
    currentView?: string; 
  
    toggleSidebar: (isSidebarOpen:boolean) => void;
    toggleRightBar: (isRightBarOpen: boolean) => void;
    toggleModal?: () => void; 
    setView?: (view: string) => void; 
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

