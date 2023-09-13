import { useEffect } from 'react';
import { useNavigation } from '@src/libs/router';
import { RoutePath } from '@src/app';
import { useAuth } from '@src/modules/auth';
import { useGlobalSpinner } from '@src/modules/global-spinner';

export interface RedirectPageProps {}

export const RedirectPage: React.FC<RedirectPageProps> = () => {
  const navigation = useNavigation();
  const { loginsso, isLogged } = useAuth();

  useEffect(() => {
    loginsso();
    if (isLogged) {
      navigation.replace(RoutePath.HOME);
    } else {
      navigation.replace(RoutePath.LOGIN);
    }
  }, [isLogged]);

  return <div>跳轉中 請稍候</div>;
};
