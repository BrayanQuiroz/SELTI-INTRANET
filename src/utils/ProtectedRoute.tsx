import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.tsx';

interface ProtectedRoute {
  element: React.ReactNode;
  roles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRoute> = ({
  element,
  roles,
}) => {
  const { authData, isReady } = useContext(AuthContext);

  if (!isReady) {
    return;
  }
  if (!authData?.nameuser || !roles.includes(authData.roleName || '')) {
    return <Navigate to="/" replace />;
  }

  return element;
};
