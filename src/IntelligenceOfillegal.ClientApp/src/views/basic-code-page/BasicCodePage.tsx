import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
//import { SearchFormCard } from './components/SearchFormCard';
import { TableCard } from './components/TableCard';
import { BasicCodeEditModal } from './components/BasicCodeEditModal';
import { BasicCodeCreateModal } from './components/BasicCodeCreateModal';

export interface BasicCodePageContainerProps {}

export const BasicCodePageContainer: FC<BasicCodePageContainerProps> = () => {
  const { initPageData } = usePageActionContext();

  useEffect(() => {
    initPageData();
  }, []);

  return (
    <div>
      <h2>基礎代碼維護頁面</h2>
      <TableCard />
      <BasicCodeCreateModal />
      <BasicCodeEditModal />
    </div>
  );
};

export const BasicCodePage = () => (
  <PageContextProvider>
    <BasicCodePageContainer />
  </PageContextProvider>
);
