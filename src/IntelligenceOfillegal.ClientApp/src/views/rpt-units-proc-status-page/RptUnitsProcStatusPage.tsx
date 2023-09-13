import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
import { SearchFormCard } from './components/SearchFormCard';
import { TableCard } from './components/TableCard';

export interface RptUnitsProcStatusPageContainerProps {}

export const RptUnitsProcStatusPageContainer: FC<RptUnitsProcStatusPageContainerProps> = () => {
  const { initPageData } = usePageActionContext();

  useEffect(() => {
    initPageData();
  }, []);

  return (
    <div>
      <h2>廉政處提報單位統計表</h2>
      <SearchFormCard />
      <TableCard />
    </div>
  );
};

export const RptUnitsProcStatusPage = () => (
  <PageContextProvider>
    <RptUnitsProcStatusPageContainer />
  </PageContextProvider>
);
