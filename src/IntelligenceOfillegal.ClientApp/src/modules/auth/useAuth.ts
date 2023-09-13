import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuth() {
  const values = useContext(AuthContext);

  return values;
}
