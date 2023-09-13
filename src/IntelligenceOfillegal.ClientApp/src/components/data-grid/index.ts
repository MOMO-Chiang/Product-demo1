import { DataGridColumn } from './DataGridColumn';
import { DataGridPagination } from './DataGridPagination';
import { DataGridTable } from './DataGridTable';
import { PageSizeSelect } from './PageSizeSelect';

import './index.scss';

export * from './useAjaxDataGrid';

export * from './utils';

export const DataGrid = {
  Table: DataGridTable,
  Pagination: DataGridPagination,
  Column: DataGridColumn,
  PageSizeSelect: PageSizeSelect,
};
