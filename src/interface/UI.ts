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