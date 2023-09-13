import { RouterProvider } from '@src/libs/router';
import { AppRouter } from './AppRouter';
import { ThemeProvider } from '@src/modules/theme';
import { GlobalSpinner, GlobalSpinnerProvider } from '@src/modules/global-spinner';
import { AuthProvider } from '@src/modules/auth';

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <GlobalSpinnerProvider>
          <RouterProvider router={AppRouter} />
          <GlobalSpinner />
        </GlobalSpinnerProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
