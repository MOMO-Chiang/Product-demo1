import { FC, ReactNode, useEffect, useState } from 'react';
import { PageActionContext } from './PageActionContext';
import { PageStateContext } from './PageStateContext';
import { ExternalIntelligenceModel, CaseDistributeEditModel, Casefile, SelectOptionList } from '../types';
import { SortedType } from '@src/shared/enums';
import { DEFAULT_PAGE } from '@src/shared/constants';
import { Alert } from '@src/libs/alert';
import {
  fetchExternalIntelligence,
  editCaseDistributeById,
  fetchExternalIntelligenceOption,
} from '../src-secure-edit.service';
import { useGlobalSpinner } from '@src/modules/global-spinner';

export interface PageContextProviderProps {
  children: ReactNode;
}

export const PageContextProvider: FC<PageContextProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSpinner, hideSpinner } = useGlobalSpinner();
  const [fileList, setFileList] = useState<Casefile[] | null>(null);
  const [selectedData, setSelectedData] = useState<ExternalIntelligenceModel | null>(null);
  const [selectOption, setSelectOption] = useState<SelectOptionList | null>(null);

  const initPageData = async (id: string | undefined) => {
    // 載入頁面先 fetch 第一頁資料
    if (id) {
      const data = await fetchExternalIntelligence(id);
      setSelectedData(data.item1);
      setFileList(data.item2);
      //取得下拉選單
      setSelectOption(await fetchExternalIntelligenceOption(id));
    }
  };

  /** 處理分案 Submit 事件 */
  const handleCaseDistributeFormSubmit = async (editModel: CaseDistributeEditModel) => {
    showSpinner();

    try {
      await editCaseDistributeById(editModel);
      hideSpinner();
      await Alert.showSuccess('分案完成。');
    } catch (error) {
      hideSpinner();
      await Alert.showError('建立分案資料發生錯誤:', (error as Error).message);
    }
  };
  return (
    <PageStateContext.Provider
      value={{
        isLoading,
        selectedData,
        fileList,
        selectOption,
      }}
    >
      <PageActionContext.Provider
        value={{
          initPageData,
          handleCaseDistributeFormSubmit,
        }}
      >
        {children}
      </PageActionContext.Provider>
    </PageStateContext.Provider>
  );
};
