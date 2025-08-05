import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api';


const ContextApi = createContext();

export const ContextProvider = ({ children }) => {

  //find the token in the localstorage
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
    : null

  const getEMail = localStorage.getItem("Email") || null;
  const getRole = localStorage.getItem("Role") || null;

  console.log(getEMail); // This will now log a clean string without extra quotes

  const [token, setToken] = useState(getToken);
  const [email, setEmail] = useState(getEMail);
  const [role, setRole] = useState(getRole);

  console.log(email);



  // Wrap app with the context provider
  return <ContextApi.Provider
    value={{
      token,
      setToken,
      email,
      setEmail,
      role,
      setRole,
    }}>{children}
  </ContextApi.Provider>
}

export const useMyContext = () => {
  const context = useContext(ContextApi);

  return context;
};
