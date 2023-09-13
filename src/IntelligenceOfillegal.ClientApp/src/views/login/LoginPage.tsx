import { FormEvent, useEffect } from 'react';
import { Card } from '@src/components/card';
import { ErrorMessage, FormGroup, Input, Label, useForm } from '@src/components/form';
import { useNavigation } from '@src/libs/router';
import { RoutePath } from '@src/app';
import { useAuth } from '@src/modules/auth';
import { useGlobalSpinner } from '@src/modules/global-spinner';
import { Alert } from '@src/libs/alert';

interface LoginForm {
  account: string;
  password: string;
}

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const navigation = useNavigation();
  const { showSpinner, hideSpinner } = useGlobalSpinner();
  const { login, isLogged } = useAuth();
  const { formData, updateFormData, validator, validateAll } = useForm<LoginForm>({
    /** 帳號 */
    account: {
      initialValue: '',
      validate: ({ value }) => (!value ? { required: '請輸入帳號' } : {}),
    },
    /** 密碼 */
    password: {
      initialValue: '',
      validate: ({ value }) => (!value ? { required: '請輸入密碼' } : {}),
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 檢核所有欄位
    const { isValid } = validateAll();

    if (isValid) {
      showSpinner('驗證中...');

      try {
        await login(formData.account, formData.password);
        hideSpinner();

        // Redirect to 首頁
        navigation.replace(RoutePath.HOME);
      } catch (error) {
        const err = error as Error;

        hideSpinner();
        Alert.showError('登入失敗', err.message);
      }
    }
  };

  useEffect(() => {
    if (isLogged) {
      navigation.replace(RoutePath.HOME);
    }
  }, [isLogged]);

  return (
    <div className="esapp-login-page-container">
      <form className="esapp-login-page-form" onSubmit={handleSubmit}>
        <Card>
          <Card.Header className="esapp-login-page-card-header">
            <h1>不法情資處理系統</h1>
          </Card.Header>
          <Card.Body className="esapp-login-page-card-body">
            <FormGroup>
              <Label>帳號</Label>
              <Input
                type="text"
                value={formData.account}
                onChange={(e) => updateFormData({ account: e.target.value })}
              />
              {validator.account.errors.required && (
                <ErrorMessage>{validator.account.errors.required}</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <Label>密碼</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData({ password: e.target.value })}
              />
              {validator.password.errors.required && (
                <ErrorMessage>{validator.password.errors.required}</ErrorMessage>
              )}
            </FormGroup>
          </Card.Body>
          <Card.Footer className="esapp-login-page-card-footer">
            <button type="submit" className="btn btn-primary btn-width-xlg">
              登入
            </button>
          </Card.Footer>
        </Card>
      </form>
    </div>
  );
};
