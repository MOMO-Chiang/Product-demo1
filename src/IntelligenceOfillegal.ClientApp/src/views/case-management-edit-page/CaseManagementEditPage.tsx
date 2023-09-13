import { FC, useEffect } from 'react';
import { PageContextProvider, usePageActionContext, usePageStateContext } from './context';
import { useParams } from 'react-router-dom';
import { SupervisorCreateFormCard } from './components/SupervisorCreateFormCard';
import { ObjPersonCreateModal } from './components/ObjPersonCreateModal';
import { ObjPersonEditModal } from './components/ObjPersonEditModal';
import { CreateFormCard } from './components/CreateFormCard';
import { CaseManagementTransferModal } from './components/CaseManagementTransferModal';
import { SuspectNameCollisionModal } from './components/SuspectNameCollisionModal';

export interface CaseManagementEditPageContainerProps {}

export const CaseManagementEditPageContainer: FC<CaseManagementEditPageContainerProps> = () => {
  const { initPageData } = usePageActionContext();
  const { caseManagementModel } = usePageStateContext();
  const { seq } = useParams();

  useEffect(() => {
    initPageData(seq ? seq : '');
  }, [seq]);

  return (
    <div>
      <h2>廉政處情資案件管理</h2>
      <div className="accordion" id="accordionManagement">
        <div className="accordion-item">
          <h2 className="accordion-header" id="intelligenceCase">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseintelligenceCase"
              aria-expanded="true"
              aria-controls="collapseintelligenceCase"
            >
              案件情資 (分案人單位 : 經防處)
            </button>
          </h2>
          <div
            id="collapseintelligenceCase"
            className="accordion-collapse collapse show"
            aria-labelledby="intelligenceCase"
            data-bs-parent="#accordionManagement"
          >
            <div className="accordion-body">
              <CreateFormCard />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="handMan">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsehandMan"
              aria-expanded="true"
              aria-controls="collapsehandMan"
            >
              承辦人輸入區 (廉政處 {caseManagementModel.itlgSrcSupervisorName})
            </button>
          </h2>
          <div
            id="collapsehandMan"
            className="accordion-collapse collapse show"
            aria-labelledby="handMan"
            data-bs-parent="#accordionManagement"
          >
            <div className="accordion-body">
              <SupervisorCreateFormCard />
            </div>
          </div>
        </div>
      </div>
      <ObjPersonCreateModal />
      <ObjPersonEditModal />
      <CaseManagementTransferModal />
      <SuspectNameCollisionModal />
    </div>
  );
};

export const CaseManagementEditPage = () => (
  <PageContextProvider>
    <CaseManagementEditPageContainer />
  </PageContextProvider>
);
