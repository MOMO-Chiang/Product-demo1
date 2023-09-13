import * as _ from 'lodash';
import { SortedModel } from './types';

export function paginateData<T>(sourceData: T[], page: number, pageSize: number, sortedModel?: SortedModel) {
  const sortedTypeStr = sortedModel && sortedModel.sortedType === -1 ? 'asc' : 'desc';

  const sortedSourceData =
    sortedModel && sortedModel.sortedColumn
      ? _.orderBy(sourceData, sortedModel.sortedColumn, sortedTypeStr)
      : sourceData;

  const totalCount = sortedSourceData.length;
  const totalPage = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const data = sortedSourceData.slice(startIndex, endIndex);
  const pageCount = data.length;

  return {
    paginatedInfo: {
      page,
      pageSize,
      totalPage,
      pageCount,
      totalCount,
    },
    data,
  };
}
