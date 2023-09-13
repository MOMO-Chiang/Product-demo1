import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext } from './context';
import { CaseInfoCard } from './components/CaseInfoCard';
import { useParams } from 'react-router-dom';
import { Card } from '@src/components/card';
import { CaseDistributeCard } from './components/CaseDistributeCard';

export interface SrcDomesticPageContainerProps {}

export const SrcDomesticPageContainer: FC<SrcDomesticPageContainerProps> = () => {
  const { initPageData } = usePageActionContext();
  const { id } = useParams();
  useEffect(() => {
    initPageData(id);
  }, []);

  return (
    <div>
      <h2>國內處情資案件</h2>
      <Card>
        <Card.Header>
          <h5>案件資訊</h5>
        </Card.Header>
        <Card.Body>
          <CaseInfoCard />
          <CaseDistributeCard />
        </Card.Body>
      </Card>
    </div>
  );
};

export const SrcDomesticEditPage = () => (
  <PageContextProvider>
    <SrcDomesticPageContainer />
  </PageContextProvider>
);
