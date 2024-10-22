export interface IUI {
    isSidebarOpen: boolean; 
    isRightBarOpen: boolean;
    isModalOpen?: boolean; 
    currentView?: string; 
  
    toggleSidebar: () => void;
    toggleRightBar: () => void;
    toggleModal?: () => void; 
    setView?: (view: string) => void; 
  }