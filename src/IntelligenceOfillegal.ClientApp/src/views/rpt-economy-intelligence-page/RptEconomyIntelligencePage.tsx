import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
import { SearchFormCard } from './components/SearchFormCard';
import { TableCard } from './components/TableCard';

export interface RptEconomyIntelligencePageContainerProps {}

export const RptEconomyIntelligencePageContainer: FC<RptEconomyIntelligencePageContainerProps> = () => {
  const { initPageData } = usePageActionContext();

  useEffect(() => {
    initPageData();
  }, []);

  return (
    <div>
      <h2>經防處國情處理報表</h2>
      <SearchFormCard />
      <TableCard />
    </div>
  );
};

export const RptEconomyIntelligencePage = () => (
  <PageContextProvider>
    <RptEconomyIntelligencePageContainer />
  </PageContextProvider>
);
