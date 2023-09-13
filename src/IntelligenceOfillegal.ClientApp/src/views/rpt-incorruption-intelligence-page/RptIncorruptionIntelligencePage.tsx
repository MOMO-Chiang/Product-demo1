import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
import { SearchFormCard } from './components/SearchFormCard';
import { TableCard } from './components/TableCard';

export interface RptIncorruptionIntelligencePageContainerProps {}

export const RptIncorruptionIntelligencePageContainer: FC<RptIncorruptionIntelligencePageContainerProps> = () => {
  const { initPageData } = usePageActionContext();

  useEffect(() => {
    initPageData();
  }, []);

  return (
    <div>
      <h2>廉政處國情處理報表</h2>
      <SearchFormCard />
      <TableCard />
    </div>
  );
};

export const RptIncorruptionIntelligencePage = () => (
  <PageContextProvider>
    <RptIncorruptionIntelligencePageContainer />
  </PageContextProvider>
);
