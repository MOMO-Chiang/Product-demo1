import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
import { SearchFormCard } from './components/SearchFormCard';

import { TableCard } from './components/TableCard';

export interface SrcLaundryPageContainerProps {}

export const SrcLaundryPageContainer: FC<SrcLaundryPageContainerProps> = () => {
  const { initPageData } = usePageActionContext();

  useEffect(() => {
    initPageData();
  }, []);

  return (
    <div>
      <h2>洗錢防制處情資案件</h2>
      <SearchFormCard />
      <TableCard />
    </div>
  );
};

export const SrcLaundryPage = () => (
  <PageContextProvider>
    <SrcLaundryPageContainer />
  </PageContextProvider>
);
