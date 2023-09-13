import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'app_theme_dsfj3r3vsss';

export interface ThemeContextValue {
  theme: 'light' | 'dark';
  changeTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  changeTheme: () => {},
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getLocalStorageTheme('light'));

  const changeTheme = useCallback(
    (theme: 'light' | 'dark') => {
      setTheme(theme);
      setLocalStorageTheme(theme);
    },
    [setTheme],
  );

  const toggleTheme = useCallback(() => {
    if (theme === 'dark') {
      setTheme('light');
      setLocalStorageTheme('light');
    } else {
      setTheme('dark');
      setLocalStorageTheme('dark');
    }
  }, [theme, setTheme]);

  useEffect(() => {
    const htmlTag = document.getElementsByTagName('html')[0];
    htmlTag.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const { theme, changeTheme, toggleTheme } = useContext(ThemeContext);

  return { theme, changeTheme, toggleTheme };
};

function setLocalStorageTheme(theme: 'light' | 'dark') {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function getLocalStorageTheme(defaultTheme: 'light' | 'dark') {
  const theme = window.localStorage.getItem(THEME_STORAGE_KEY) as 'light' | 'dark';

  return theme || defaultTheme;
}
