import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
import { SearchFormCard } from './components/SearchFormCard';
import { TableCard } from './components/TableCard';

export interface RptIntelligenceSourcePageContainerProps {}

export const RptIntelligenceSourcePageContainer: FC<RptIntelligenceSourcePageContainerProps> = () => {
  const { initPageData } = usePageActionContext();

  useEffect(() => {
    initPageData();
  }, []);

  return (
    <div>
      <h2>專案情資來源件數統計</h2>
      <SearchFormCard />
      <TableCard />
    </div>
  );
};

export const RptIntelligenceSourcePage = () => (
  <PageContextProvider>
    <RptIntelligenceSourcePageContainer />
  </PageContextProvider>
);
