import { FC } from 'react';
import cx from 'classnames';
import { useTheme } from '@src/modules/theme';

export interface ThemeToggleButtonProps {}

export const ThemeToggleButton: FC<ThemeToggleButtonProps> = () => {
  const { theme, toggleTheme } = useTheme();
  const isThemeLight = theme === 'light';

  return (
    <li className="nav-item me-3">
      <a
        className={cx('nav-link theme-toggle-button', { light: !isThemeLight, dark: isThemeLight })}
        onClick={toggleTheme}
      >
        <i className={cx({ 'fa-regular fa-sun': !isThemeLight, 'fa-regular fa-moon': isThemeLight })} />
      </a>
    </li>
  );
};
