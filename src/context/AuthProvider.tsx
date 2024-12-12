import React, { ReactNode, useEffect, useState } from 'react';
import { AuthContext, AutData, defaultAuthData } from './AuthContext.tsx';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authData, setAuthData] = useState<AutData>(defaultAuthData);

  const [isReady, setIsReady] = useState(false);

  // console.log(authData)

  useEffect(() => {
    if (isReady) {
      localStorage.setItem('authData', JSON.stringify(authData));
    }
  }, [authData, isReady]);

  useEffect(() => {
    const storeAuthData = localStorage.getItem('authData');
    console.log(storeAuthData);
    if (storeAuthData) {
      setAuthData(JSON.parse(storeAuthData));
    }
    setIsReady(true);
  }, []);

  const AuthDataUpdate = (newAuthData: Partial<AutData>) => {
    setAuthData((prevAuthDataUpdate) => ({
      ...prevAuthDataUpdate,
      ...newAuthData,
    }));
  };

  const handleLogout = () => {
    setAuthData({
      usernameid: null,
      nameuser: null,
      roleName: null,
      userId: null,
      usuarioName: null,
      rucUsuario: null,
      correo: null,
      codigoEdicion: null,
      codigoEtapa: null,
      flaglinea: null,
    });

    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider value={{ authData, AuthDataUpdate, handleLogout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};
