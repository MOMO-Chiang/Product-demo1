import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
import { SearchFormCard } from './components/SearchFormCard';

import { TableCard } from './components/TableCard';

export interface SrcDomesticPageContainerProps {}

export const SrcDomesticPageContainer: FC<SrcDomesticPageContainerProps> = () => {
  const { initPageData } = usePageActionContext();

  useEffect(() => {
    initPageData();
  }, []);

  return (
    <div>
      <h2>國內處情資案件</h2>
      <SearchFormCard />
      <TableCard />
    </div>
  );
};

export const SrcDomesticPage = () => (
  <PageContextProvider>
    <SrcDomesticPageContainer />
  </PageContextProvider>
);
