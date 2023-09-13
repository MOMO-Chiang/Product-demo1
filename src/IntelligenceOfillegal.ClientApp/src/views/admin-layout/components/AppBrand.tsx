import { FC } from 'react';

export interface AppBrandProps {}

export const AppBrand: FC<AppBrandProps> = () => (
  <h2 className="app-brand">
    <a href="/">不法情資處理系統</a>
  </h2>
);
