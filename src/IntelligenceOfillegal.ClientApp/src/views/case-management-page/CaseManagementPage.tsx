import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
import { SearchFormCard } from './components/SearchFormCard';
import { TableCard } from './components/TableCard';

export interface CaseManagementPageContainerProps {}

export const CaseManagementPageContainer: FC<CaseManagementPageContainerProps> = () => {
  const { initPageData } = usePageActionContext();

  useEffect(() => {
    initPageData();
  }, []);

  return (
    <div>
      <h2>情資案件管理</h2>
      <SearchFormCard />
      <TableCard />
    </div>
  );
};

export const CaseManagementPage = () => (
  <PageContextProvider>
    <CaseManagementPageContainer />
  </PageContextProvider>
);
