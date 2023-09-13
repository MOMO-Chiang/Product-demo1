import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
import { SearchFormCard } from './components/SearchFormCard';

import { TableCard } from './components/TableCard';
import { SystemUsersEditModal } from './components/SystemUsersEditModal';

export interface SystemUsersPageContainerProps {}

export const SystemUsersPageContainer: FC<SystemUsersPageContainerProps> = () => {
  const { initPageData } = usePageActionContext();

  useEffect(() => {
    initPageData();
  }, []);

  return (
    <div>
      <h2>使用者帳號管理頁面</h2>
      <SearchFormCard />
      <TableCard />
      <SystemUsersEditModal />
    </div>
  );
};

export const SystemUsersPage = () => (
  <PageContextProvider>
    <SystemUsersPageContainer />
  </PageContextProvider>
);
