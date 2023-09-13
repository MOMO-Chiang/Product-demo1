import { FC, ReactNode, useState } from 'react';
import { GlobalSpinnerContext, SpinnerOptions } from './GlobalSpinnerContext';

export interface GlobalSpinnerProviderProps {
  children: ReactNode;
}

/**
 * `GlobalSpinnerProvider` 元件
 */
export const GlobalSpinnerProvider: FC<GlobalSpinnerProviderProps> = ({ children }) => {
  const [spinners, setSpinners] = useState<SpinnerOptions[]>([]);

  const showSpinner = (spinnerId: string, message?: string) => {
    if (spinners.find((spr) => spr.uid === spinnerId)) {
      setSpinners(spinners.map((spr) => (spr.uid === spinnerId ? { ...spr, message } : spr)));
    } else {
      setSpinners(spinners.concat({ uid: spinnerId, message }));
    }

    return spinnerId;
  };

  const hideSpinner = (spinnerId: string) => {
    setSpinners(spinners.filter((spr) => spr.uid !== spinnerId));

    return spinnerId;
  };

  const clearSpinner = () => {
    setSpinners([]);
  };

  return (
    <GlobalSpinnerContext.Provider
      value={{
        spinners,
        showSpinner,
        hideSpinner,
        clearSpinner,
      }}
    >
      {children}
    </GlobalSpinnerContext.Provider>
  );
};
