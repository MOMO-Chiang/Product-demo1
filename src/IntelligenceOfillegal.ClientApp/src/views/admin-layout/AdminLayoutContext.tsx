import { FC, useState, ReactNode, createContext, useContext } from 'react';

export interface AdminLayoutContextValue {
  /** 手機版 Sidebar 是否開啟 */
  isMobileSidebarOpen: boolean;

  /** 桌機版 Sidebar 是否收合 */
  isDesktopSidebarCollapsed: boolean;

  /** 手機版 Sidebar 顯示控制 */
  toggleMobileSidebarOpen: () => void;

  /** 桌機版 Sidebar 收合控制  */
  toggleDesktopSidebarCollapsed: () => void;
}

const defaultContextValue = {
  isMobileSidebarOpen: false,
  isDesktopSidebarCollapsed: false,
  toggleMobileSidebarOpen: () => {},
  toggleDesktopSidebarCollapsed: () => {},
} satisfies AdminLayoutContextValue;

const AdminLayoutContext = createContext<AdminLayoutContextValue>(defaultContextValue);

export interface AdminLayoutProviderProps {
  children: ReactNode;
}

/**
 * AdminLayoutContext's Provider
 * @returns AdminLayoutProvider
 */
export const AdminLayoutProvider: FC<AdminLayoutProviderProps> = ({ children }) => {
  /** 是否開啟 "手機版 Sidebar" */
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  /** 是否展開 "桌機版 Sidebar" */
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  return (
    <AdminLayoutContext.Provider
      value={{
        isMobileSidebarOpen,
        isDesktopSidebarCollapsed,
        toggleMobileSidebarOpen: () => setIsMobileSidebarOpen(!isMobileSidebarOpen),
        toggleDesktopSidebarCollapsed: () => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed),
      }}
    >
      {children}
    </AdminLayoutContext.Provider>
  );
};

/**
 * `useAdminLayoutContext` Hook
 * @returns AdminLayoutContextValue
 */
export function useAdminLayoutContext(): AdminLayoutContextValue {
  const values = useContext(AdminLayoutContext);

  return values;
}
