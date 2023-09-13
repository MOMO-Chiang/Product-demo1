import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
import { SearchFormCard } from './components/SearchFormCard';

import { TableCard } from './components/TableCard';
import { SystemUnitRespPersonCreateModal } from './components/SystemUnitRespPersonCreateModal';
import { SystemUnitRespPersonEditModal } from './components/SystemUnitRespPersonEditModal';
import { SystemUnitRespPersonDeleteModal } from './components/SystemUnitRespPersonDeleteModal';

export interface SystemUnitRespPersonPageContainerProps {}

export const SystemUnitRespPersonPageContainer: FC<SystemUnitRespPersonPageContainerProps> = () => {
  const { initPageData } = usePageActionContext();

  useEffect(() => {
    initPageData();
  }, []);

  return (
    <div>
      <h2>單位承辦人頁面</h2>
      <SearchFormCard />
      <TableCard />
      <SystemUnitRespPersonCreateModal />
      <SystemUnitRespPersonEditModal />
      <SystemUnitRespPersonDeleteModal />
    </div>
  );
};

export const SystemUnitRespPersonPage = () => (
  <PageContextProvider>
    <SystemUnitRespPersonPageContainer />
  </PageContextProvider>
);
