import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
import { SearchFormCard } from './components/SearchFormCard';
import { TableCard } from './components/TableCard';

export interface RptLaundryIntelligencePageContainerProps {}

export const RptLaundryIntelligencePageContainer: FC<RptLaundryIntelligencePageContainerProps> = () => {
  const { initPageData } = usePageActionContext();

  useEffect(() => {
    initPageData();
  }, []);

  return (
    <div>
      <h2>廉政處洗錢處理報表</h2>
      <SearchFormCard />
      <TableCard />
    </div>
  );
};

export const RptLaundryIntelligencePage = () => (
  <PageContextProvider>
    <RptLaundryIntelligencePageContainer />
  </PageContextProvider>
);
