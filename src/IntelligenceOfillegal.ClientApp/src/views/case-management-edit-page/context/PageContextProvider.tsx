import { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react';
import { PageActionContext } from './PageActionContext';
import { PageStateContext } from './PageStateContext';
import { SelectOptionConfig, SortedType } from '@src/shared/enums';
import { Alert } from '@src/libs/alert';
import {
  updateCaseManagementList,
  updateSupervisor,
  fetchCaseManagementList,
  fetchCaseManagementSelectOptions,
  fetchIntelligenceNo,
  downloadFile,
  createCaseManagementTransferHistory,
  fetchCaseManagementTransferHistory,
  mainSuspectNameCollision,
} from '../case-management-edit.service';
import { useGlobalSpinner } from '@src/modules/global-spinner';
import { useDataGrid } from '@src/components/data-grid/useDataGrid';
import * as DateFns from 'date-fns';
import { getLoginInfo } from '@src/modules/auth';
import { RoutePath } from '@src/app';
import { useNavigation } from '@src/libs/router';
import { ItlgInvolvedAgencyCode } from '@src/shared/itlginvolvedagencycode';
import {
  CaseManagementModel,
  CaseManagementTransferHistory,
  CaseManagementTransferHistoryCreateParams,
  ObjPerson,
  SupervisorModel,
  UploadFileList,
} from '../types';
import '../caseManagement.scss';

export interface PageContextProviderProps {
  children: ReactNode;
}

export const PageContextProvider: FC<PageContextProviderProps> = ({ children }) => {
  const navigation = useNavigation();
  /** 預設下拉選單 */
  const DEFAULT_OPTION = [{ text: '--- 請選擇 ---', value: '' }];
  const [isLoading, setIsLoading] = useState(false);
  const { showSpinner, hideSpinner } = useGlobalSpinner();
  const [isShowObjPersonCreateModal, setIsShowObjPersonCreateModal] = useState(false);
  const [isShowObjPersonEditModal, setIsShowObjPersonEditModal] = useState(false);
  const [isShowCaseManagementTransferModal, setIsShowCaseManagementTransferModal] = useState(false);
  const [isShowSuspectNameCollisionModal, setIsShowSuspectNameCollisionModal] = useState(false);
  const [downloadFileLists, setDownloadFileLists] = useState<UploadFileList[]>([]);
  const [collisionSuspectName, setCollisionSuspectName] = useState('');
  const [caseManagementModel, setCaseManagementModel] = useState<CaseManagementModel>({
    seq: '',
    intelligenceCaseId: '',
    intelligenceNo: '',
    investigateProgressCode: '',
    itlgSrcUnitCode: '',
    itlgSrcNo: '',
    objectCategory: '',
    createTime: '',
    receiveReportNum: '',
    itlgSrcReportUnitCode: '',
    itlgSrcReportNumber: '',
    itlgSrcTransReportPersonId: '',
    itlgInvolvedAgencyCode: '',
    mainSuspectName: '',
    mainSuspectId: '',
    caseCategory: '',
    supervisorDepartment: '',
    itlgSrcSupervisorName: '',
    itlgSrcSupervisorId: '',
    mainSuspectRole: '',
    itlgSrcCaseName: '',
    itlgSrcCaseAbstract: '',
    caseDistributeUnit: '',
    itlgSrcCreateFileDate: '',
    itlgSrcNumber: '',
  });
  const [supervisorModel, setSupervisorModel] = useState<SupervisorModel>({
    intelligenceNo: '',
    investigateProgressCode: '',
    assignInvestigateDate: '',
    reCheckDate: '',
    mainCaseIntelligenceNumber: '',
    remark: '',
    caseAdminNumber: '',
    mainCaseType: '',
    subCaseType: '',
  });
  const [editObjPersonModal, setEditObjPersonModal] = useState<ObjPerson>({
    seq: 0,
    isMainSuspect: false,
    personTitle: '',
    personName: '',
    personID: '',
    isReportLink: false,
    createPersonId: '',
    createTime: '',
    objPersonId: '',
  });
  const [itlgSrcUnitCodeSelectOptions, setItlgSrcUnitCodeSelectOptions] = useState<SelectOptionConfig[]>([]);
  const [objectCategorySelectOptions, setObjectCategorySelectOptions] = useState<SelectOptionConfig[]>([]);
  const [unitCodeSelectOptions, setUnitCodeSelectOptions] = useState<SelectOptionConfig[]>([]);
  const [caseCategorySelectOptions, setCaseCategorySelectOptions] = useState<SelectOptionConfig[]>([]);
  const [supervisorDepartmentSelectOptions, setSupervisorDepartmentSelectOptions] = useState<
    SelectOptionConfig[]
  >([]);
  const [mainSuspectRoleSelectOptions, setMainSuspectRoleSelectOptions] = useState<SelectOptionConfig[]>([]);
  const [mainCaseTypeSelectOptions, setMainCaseTypeSelectOptions] = useState<SelectOptionConfig[]>([]);
  const [subCaseTypeSelectOptions, setSubCaseTypeSelectOptions] = useState<SelectOptionConfig[]>([]);
  const [investigateProgressSelectOptions, setInvestigateProgressSelectOptions] = useState<
    SelectOptionConfig[]
  >([]);
  const [objectPersonSelectOptions, setObjectPersonSelectOptions] = useState<SelectOptionConfig[]>([]);
  const [itlgInvolvedAgencySelectOptions, setItlgInvolvedAgencySelectOptions] = useState<
    SelectOptionConfig[]
  >([]);
  const [supervisorSelectOptions, setSupervisorSelectOptions] = useState<SelectOptionConfig[]>([]);

  /** 檔案列表 資料 */
  const {
    pkField,
    gridData,
    paginatedGridData,
    paginatedInfoModel,
    sortedModel,
    setGridData,
    handlePageChange,
    handleSortChange,
  } = useDataGrid<UploadFileList, number>({ pkField: 'seq', gridData: [] });

  /** 主對象列表 資料 */
  const {
    pkField: objPersonPkField,
    gridData: objPersonGridData,
    paginatedGridData: objPersonPaginatedGridData,
    paginatedInfoModel: objPersonPaginatedInfoModel,
    sortedModel: objPersonSortedModel,
    setGridData: setobjPersonGridData,
    handlePageChange: handleobjPersonPageChange,
    handleSortChange: handleobjPersonSortChange,
  } = useDataGrid<ObjPerson, number>({ pkField: 'seq', gridData: [] });

  /** 承辦人上傳檔案 資料 */
  const {
    pkField: supervisorPkField,
    gridData: supervisorGridData,
    paginatedGridData: supervisorPaginatedGridData,
    paginatedInfoModel: supervisorPaginatedInfoModel,
    sortedModel: supervisorSortedModel,
    setGridData: setSupervisorGridData,
    handlePageChange: handleSupervisorPageChange,
    handleSortChange: handleSupervisorSortChange,
  } = useDataGrid<UploadFileList, number>({ pkField: 'seq', gridData: [] });

  /** 情資轉移歷程 資料 */
  const {
    pkField: caseManagementTransferHistoryPkField,
    gridData: caseManagementTransferHistoryGridData,
    paginatedGridData: caseManagementTransferHistoryPaginatedGridData,
    paginatedInfoModel: caseManagementTransferHistoryPaginatedInfoModel,
    sortedModel: caseManagementTransferHistorySortedModel,
    setGridData: setCaseManagementTransferHistoryGridData,
    handlePageChange: handleCaseManagementTransferHistoryPageChange,
    handleSortChange: handleCaseManagementTransferHistorySortChange,
  } = useDataGrid<CaseManagementTransferHistory, number>({ pkField: 'seq', gridData: [] });

  /** 不法情資系統-對象姓名比對結果 */
  const {
    pkField: intelligenceOfillegalCollisionPkField,
    gridData: intelligenceOfillegalCollisionGridData,
    paginatedGridData: intelligenceOfillegalCollisionPaginatedGridData,
    paginatedInfoModel: intelligenceOfillegalCollisionPaginatedInfoModel,
    sortedModel: intelligenceOfillegalCollisionSortedModel,
    setGridData: setIntelligenceOfillegalCollisionGridData,
    handlePageChange: handleIntelligenceOfillegalCollisionPageChange,
    handleSortChange: handleIntelligenceOfillegalCollisionSortChange,
  } = useDataGrid<CaseManagementModel, number>({ pkField: 'seq', gridData: [] });

  const UploadFile = (file: ChangeEvent<HTMLInputElement>) => {
    file.preventDefault();
    if (file.target.files && file.target.files.length) {
      const fileData = file.target.files[0];
      const uploadFile: UploadFileList[] = [
        {
          file: fileData,
          seq:
            gridData.length == 0
              ? 1
              : gridData.reduce((max, current) => {
                  return current.seq > max.seq ? current : max;
                }, gridData[0]).seq + 1,
          originFileName: fileData.name,
          createPersonId: getLoginInfo() != null ? getLoginInfo()?.userInfo.uid : '',
          createTime: DateFns.format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
          userUploadType: 1,
          intelligenceFileId: null,
        },
      ];
      setGridData(gridData.concat(uploadFile));
    }
  };

  const DeteleFile = (seq: number) => {
    setGridData(gridData.filter((x) => x.seq != seq));
  };

  const UploadSupervisorFile = (file: ChangeEvent<HTMLInputElement>) => {
    file.preventDefault();
    if (file.target.files && file.target.files.length) {
      const fileData = file.target.files[0];
      const uploadFile: UploadFileList[] = [
        {
          file: fileData,
          seq:
            supervisorGridData.length == 0
              ? 1
              : supervisorGridData.reduce((max, current) => {
                  return current.seq > max.seq ? current : max;
                }, supervisorGridData[0]).seq + 1,
          originFileName: fileData.name,
          createPersonId: getLoginInfo() != null ? getLoginInfo()?.userInfo.uid : '',
          createTime: DateFns.format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
          userUploadType: 2,
          intelligenceFileId: null,
        },
      ];
      setSupervisorGridData(supervisorGridData.concat(uploadFile));
    }
  };

  const DeteleSupervisorFile = (seq: number) => {
    setSupervisorGridData(supervisorGridData.filter((x) => x.seq != seq));
  };

  /** 關閉 ObjPersonCreateModal */
  const closeObjPersonCreateModal = () => {
    setIsShowObjPersonCreateModal(false);
  };

  /** 開啟 ObjPersonCreateModal */
  const openObjPersonCreateModal = () => {
    setIsShowObjPersonCreateModal(true);
  };

  /** 關閉 ObjPersonEditModal */
  const closeObjPersonEditModal = () => {
    setIsShowObjPersonEditModal(false);
  };

  /** 開啟 ObjPersonEditModal */
  const openObjPersonEditModal = (seq: number) => {
    setIsShowObjPersonEditModal(true);
    setEditObjPersonModal(objPersonGridData.filter((x) => x.seq == seq)[0]);
  };

  /** 關閉 CaseManagementTransferModalModal */
  const closeCaseManagementTransferModal = () => {
    setIsShowCaseManagementTransferModal(false);
  };

  /** 開啟 CaseManagementTransferModalModal */
  const openCaseManagementTransferModal = async () => {
    const caseManagementTransferHistory = await fetchCaseManagementTransferHistory(
      caseManagementModel.intelligenceCaseId,
    );
    setCaseManagementTransferHistoryGridData(caseManagementTransferHistory);
    setIsShowCaseManagementTransferModal(true);
  };

  /** 情資轉移 */
  const CaseManagementTransfer = async (formData: CaseManagementTransferHistoryCreateParams) => {
    showSpinner();
    try {
      await createCaseManagementTransferHistory(formData);
      hideSpinner();
      Alert.showSuccess('轉移成功');
      const caseManagementTransferHistory = await fetchCaseManagementTransferHistory(
        caseManagementModel.intelligenceCaseId,
      );
      setCaseManagementTransferHistoryGridData(caseManagementTransferHistory);
    } catch (err) {
      const error = err as Error;
      hideSpinner();
      Alert.showError('轉移失敗', error.message);
    }
  };

  /** 開啟 SuspectNameCollisionModal */
  const openSuspectNameCollisionModal = async (suspectname: string) => {
    if (suspectname.trim() == '') {
      Alert.showError('請輸入關鍵字');
      return;
    }
    const result = await mainSuspectNameCollision(suspectname);
    setIntelligenceOfillegalCollisionGridData(result);
    setIsShowSuspectNameCollisionModal(true);
    setCollisionSuspectName(suspectname);
  };

  /** 關閉 SuspectNameCollisionModal */
  const closeSuspectNameCollisionModal = () => {
    setIsShowSuspectNameCollisionModal(false);
  };
  /** 更新按鈕事件 */
  const handleUpdateFormSubmit = async (updateFormData: CaseManagementModel) => {
    showSpinner();
    try {
      if (objPersonGridData.filter((x) => x.isMainSuspect).length > 1) {
        hideSpinner();
        Alert.showError('主要對象只能有一人');
        return;
      }
      const updateParams = new FormData();
      gridData.forEach((x) => {
        updateParams.append('file[]', x.file);
      });
      updateParams.append('CaseManagement', JSON.stringify(updateFormData));
      updateParams.append('ObjPersons', JSON.stringify(objPersonGridData));
      updateParams.append('UploadFileLists', JSON.stringify(gridData));
      await updateCaseManagementList(updateParams);
      hideSpinner();
      Alert.showSuccess('更新成功');
      //navigation.replace(RoutePath.CASE_MANAGEMENT);
    } catch (err) {
      const error = err as Error;
      hideSpinner();
      Alert.showError('更新失敗', error.message);
    }
  };

  /** 承辦人更新按鈕事件 */
  const handleSupervisorFormSubmit = async (supervisorUpdateFormData: SupervisorModel) => {
    showSpinner();
    try {
      const updateParams = new FormData();
      supervisorGridData.forEach((x) => updateParams.append('file[]', x.file));
      updateParams.append('SupervisorCaseManagement', JSON.stringify(supervisorUpdateFormData));
      updateParams.append('UploadFileLists', JSON.stringify(supervisorGridData));
      await updateSupervisor(updateParams);
      hideSpinner();
      Alert.showSuccess('更新成功');
      //navigation.replace(RoutePath.CASE_MANAGEMENT);
    } catch (err) {
      const error = err as Error;
      hideSpinner();
      Alert.showError('更新失敗', error.message);
    }
  };

  const createObjPersonCreateModal = (formData: ObjPerson) => {
    const objPerson: ObjPerson[] = [
      {
        seq:
          objPersonGridData.length == 0
            ? 1
            : objPersonGridData.reduce((max, current) => {
                return current.seq > max.seq ? current : max;
              }, objPersonGridData[0]).seq + 1,
        isMainSuspect: formData.isMainSuspect,
        personTitle: '',
        personName: formData.personName,
        personID: formData.personID,
        isReportLink: formData.isReportLink,
        createPersonId: getLoginInfo() != null ? getLoginInfo()?.userInfo.uid : '',
        createTime: formData.createTime,
        objPersonId: null,
      },
    ];
    setobjPersonGridData(objPersonGridData.concat(objPerson));
    setIsShowObjPersonCreateModal(false);
    /** 清空新增Modal */
    formData.isMainSuspect = false;
    formData.personTitle = '';
    formData.personName = '';
    formData.personID = '';
    formData.isReportLink = false;
    formData.createPersonId = '';
    formData.createTime = '';
  };

  const updateObjPersonCreateModal = (formData: ObjPerson) => {
    //setobjPersonGridData(objPersonGridData[0]);
    setobjPersonGridData(
      objPersonGridData.map((item) => {
        if (item.seq === formData.seq) {
          return formData;
        }
        return item;
      }),
    );
    setIsShowObjPersonEditModal(false);
  };

  const DeteleObjPerson = (seq: number) => {
    setobjPersonGridData(objPersonGridData.filter((x) => x.seq != seq));
  };

  const FilterItlgInvolvedAgencySelectOptions = (key: string) => {
    setItlgInvolvedAgencySelectOptions(
      ItlgInvolvedAgencyCode.filter(
        (x) => (key != '' ? x.NAME.includes(key) : false) || (x.CODE == '' && x.NAME == '非屬以上機關'),
      ).map((x) => {
        return {
          text: x.NAME,
          value: x.CODE ? x.CODE : '',
        };
      }),
    );
  };

  const DownloadFile = async (id: string) => {
    try {
      await downloadFile(id ? id : '');
    } catch (err) {
      const error = err as Error;
      Alert.showError('下載失敗', error.message);
    }
  };

  useEffect(() => {
    setObjectPersonSelectOptions(
      DEFAULT_OPTION.concat(
        objPersonGridData.map((x) => {
          return {
            value: x.personID,
            text: x.personName,
          };
        }),
      ),
    );
  }, [objPersonGridData]);

  useEffect(() => {
    setItlgInvolvedAgencySelectOptions(
      ItlgInvolvedAgencyCode.filter((x) => x.CODE == caseManagementModel.itlgInvolvedAgencyCode).map((x) => {
        return {
          text: x.NAME,
          value: x.CODE ? x.CODE : '',
        };
      }),
    );
  }, [caseManagementModel]);

  const initPageData = async (seq: string) => {
    showSpinner();
    // 載入頁面先 fetch 下拉選單 & 取得情資編號
    const caseManagementSelectOptions = await fetchCaseManagementSelectOptions();
    setItlgSrcUnitCodeSelectOptions(
      DEFAULT_OPTION.concat(caseManagementSelectOptions.itlgSrcUnitCodeSelectOptions),
    );
    setObjectCategorySelectOptions(
      DEFAULT_OPTION.concat(caseManagementSelectOptions.objectCategorySelectOptions),
    );
    setUnitCodeSelectOptions(DEFAULT_OPTION.concat(caseManagementSelectOptions.unitCodeSelectOptions));
    setCaseCategorySelectOptions(
      DEFAULT_OPTION.concat(caseManagementSelectOptions.caseCategorySelectOptions),
    );
    setSupervisorDepartmentSelectOptions(
      DEFAULT_OPTION.concat(caseManagementSelectOptions.supervisorDepartmentSelectOptions),
    );
    setMainSuspectRoleSelectOptions(
      DEFAULT_OPTION.concat(caseManagementSelectOptions.mainSuspectRoleSelectOptions),
    );
    setMainCaseTypeSelectOptions(
      DEFAULT_OPTION.concat(caseManagementSelectOptions.mainCaseTypeSelectOptions),
    );
    setSubCaseTypeSelectOptions(DEFAULT_OPTION.concat(caseManagementSelectOptions.subCaseTypeSelectOptions));
    setInvestigateProgressSelectOptions(
      DEFAULT_OPTION.concat(caseManagementSelectOptions.investigateProgressSelectOptions),
    );
    setSupervisorSelectOptions(DEFAULT_OPTION.concat(caseManagementSelectOptions.supervisorSelectOptions));

    const caseCaseManagementEditModel = await fetchCaseManagementList(seq);
    setobjPersonGridData(caseCaseManagementEditModel.objPersons);
    setGridData(caseCaseManagementEditModel.uploadFileLists);
    setSupervisorGridData(caseCaseManagementEditModel.supervisorUploadFileLists);
    setCaseManagementModel(caseCaseManagementEditModel.caseManagement);
    setSupervisorModel(caseCaseManagementEditModel.supervisorCaseManagement);
    setDownloadFileLists(caseCaseManagementEditModel.downloadFileLists);

    hideSpinner();
  };

  return (
    <PageStateContext.Provider
      value={{
        isLoading,
        caseManagementModel,
        supervisorModel,
        downloadFileLists,
        pkField,
        gridData,
        paginatedGridData,
        paginatedInfoModel,
        sortedModel,
        objPersonPkField,
        objPersonGridData,
        objPersonPaginatedGridData,
        objPersonPaginatedInfoModel,
        objPersonSortedModel,
        supervisorPkField,
        supervisorGridData,
        supervisorPaginatedGridData,
        supervisorPaginatedInfoModel,
        supervisorSortedModel,
        caseManagementTransferHistoryPkField,
        caseManagementTransferHistoryGridData,
        caseManagementTransferHistoryPaginatedGridData,
        caseManagementTransferHistoryPaginatedInfoModel,
        caseManagementTransferHistorySortedModel,
        intelligenceOfillegalCollisionPkField,
        intelligenceOfillegalCollisionGridData,
        intelligenceOfillegalCollisionPaginatedGridData,
        intelligenceOfillegalCollisionPaginatedInfoModel,
        intelligenceOfillegalCollisionSortedModel,
        collisionSuspectName,
        isShowObjPersonCreateModal,
        isShowObjPersonEditModal,
        isShowCaseManagementTransferModal,
        isShowSuspectNameCollisionModal,
        editObjPersonModal,
        itlgSrcUnitCodeSelectOptions,
        objectCategorySelectOptions,
        unitCodeSelectOptions,
        caseCategorySelectOptions,
        supervisorDepartmentSelectOptions,
        mainSuspectRoleSelectOptions,
        mainCaseTypeSelectOptions,
        subCaseTypeSelectOptions,
        investigateProgressSelectOptions,
        objectPersonSelectOptions,
        itlgInvolvedAgencySelectOptions,
        supervisorSelectOptions,
      }}
    >
      <PageActionContext.Provider
        value={{
          initPageData,
          handleUpdateFormSubmit,
          handleSupervisorFormSubmit,
          handlePageChange,
          handleSortChange,
          handleobjPersonPageChange,
          handleobjPersonSortChange,
          handleIntelligenceOfillegalCollisionPageChange,
          handleIntelligenceOfillegalCollisionSortChange,
          UploadFile,
          DeteleFile,
          handleSupervisorPageChange,
          handleSupervisorSortChange,
          UploadSupervisorFile,
          DeteleSupervisorFile,
          closeObjPersonCreateModal,
          openObjPersonCreateModal,
          closeObjPersonEditModal,
          openObjPersonEditModal,
          closeCaseManagementTransferModal,
          openCaseManagementTransferModal,
          handleCaseManagementTransferHistoryPageChange,
          handleCaseManagementTransferHistorySortChange,
          CaseManagementTransfer,
          openSuspectNameCollisionModal,
          closeSuspectNameCollisionModal,
          createObjPersonCreateModal,
          updateObjPersonCreateModal,
          DeteleObjPerson,
          FilterItlgInvolvedAgencySelectOptions,
          DownloadFile,
        }}
      >
        {children}
      </PageActionContext.Provider>
    </PageStateContext.Provider>
  );
};
