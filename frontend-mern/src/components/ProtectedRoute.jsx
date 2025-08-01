import React from 'react'
import { useMyContext } from '../store/Context'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  const { token } = useMyContext();

  // If the user does'nt have token(Not logged in) he will be redirected to the login
  if (!token) {
    return <Navigate to="/" />;
  }

  return children

}

export default ProtectedRoute