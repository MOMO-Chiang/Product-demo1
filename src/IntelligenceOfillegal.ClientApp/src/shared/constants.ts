import { SortedType } from './enums';

/** true 的 string 值: '1' */
export const TRUE_STRING = '1';
/** false 的 string 值: '0' */
export const FALSE_STRING = '0';

/** 預設分頁大小 */
export const DEFAULT_PAGE_SIZE = 10;

/** 預設頁碼 */
export const DEFAULT_PAGE = 1;

/** 預設頁碼資料筆數 */
export const DEFAULT_PAGE_COUNT = 0;

/** 預設總頁數 */
export const DEFAULT_TOTAL_PAGE = 1;

/** 預設總筆數 */
export const DEFAULT_TOTAL_PAGE_COUNT = 0;

/** 分頁大小下拉選單值 */
export const PAGE_SIZE_OPTIONS = [10, 15, 30, 50];
//#endregion

/** 預設分頁模型資料 */
export const DEFAULT_PAGINATED_MODEL = {
  /** 當前頁數 */
  page: DEFAULT_PAGE,
  /** 分頁大小 */
  pageSize: DEFAULT_PAGE_SIZE,
  /** 總頁數 */
  totalPage: DEFAULT_TOTAL_PAGE,
  /** 當頁資料筆數 */
  pageCount: DEFAULT_PAGE_COUNT,
  /** 總資料筆數 */
  totalCount: DEFAULT_TOTAL_PAGE_COUNT,
};

/** 預設排序模型資料 */
export const DEFAULT_SORTED_MODEL = {
  /** 排序欄位名稱 */
  sortedColumn: '',
  /** 排序類型 */
  sortedType: SortedType.ASC,
};

export const ALL_OPTION_VALUE = '';
export const YES_OPTION_VALUE = TRUE_STRING;
export const NO_OPTION_VALUE = FALSE_STRING;

export const ALL_OPTION = { value: ALL_OPTION_VALUE, text: '全部' };
export const YES_OPTION = { value: YES_OPTION_VALUE, text: '是' };
export const NO_OPTION = { value: NO_OPTION_VALUE, text: '否' };

/** [全部, 否, 是] 下拉選單 */
export const ALL_NO_YES_OPTIONS = [ALL_OPTION, NO_OPTION, YES_OPTION];

/** [否,是] 下拉選單 */
export const NO_YES_OPTIONS = [NO_OPTION, YES_OPTION];

/** [是,否] 下拉選單 */
export const YES_NO_OPTIONS = [YES_OPTION, NO_OPTION];

/** 跳轉網址白名單 */
export const REFERRER_WHITELIST = [
  '10.39.11.159',
  'mportal.mjib.gov.tw',
  '192.168.156.11',
  '192.168.156.12',
  'localhost',
];
