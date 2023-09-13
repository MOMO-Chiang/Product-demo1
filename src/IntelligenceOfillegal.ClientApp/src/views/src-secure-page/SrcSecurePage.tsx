import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
import { SearchFormCard } from './components/SearchFormCard';

import { TableCard } from './components/TableCard';

export interface SrcSecurePageContainerProps {}

export const SrcSecurePageContainer: FC<SrcSecurePageContainerProps> = () => {
  const { initPageData } = usePageActionContext();

  useEffect(() => {
    initPageData();
  }, []);

  return (
    <div>
      <h2>保防處情資案件</h2>
      <SearchFormCard />
      <TableCard />
    </div>
  );
};

export const SrcSecurePage = () => (
  <PageContextProvider>
    <SrcSecurePageContainer />
  </PageContextProvider>
);
