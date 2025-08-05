import React from 'react'
import { useMyContext } from '../store/Context'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminPage }) => {

  const { token } = useMyContext();
  const { role } = useMyContext();

  // If the user does'nt have token(Not logged in) he will be redirected to the login
  if (!token) {
    return <Navigate to="/" />;
  }

  if (token && adminPage && role === 'agent') {
    return <Navigate to="/" />;
  }

  return children

}

export default ProtectedRoute