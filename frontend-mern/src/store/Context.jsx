import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api';


const ContextApi = createContext();

export const ContextProvider = ({ children }) => {

  //find the token in the localstorage
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
    : null;


  //store the token
  const [token, setToken] = useState(getToken);


  // Wrap app with the context provider
  return <ContextApi.Provider
    value={{
      token,
      setToken,
    }}>{children}
  </ContextApi.Provider>
}

export const useMyContext = () => {
  const context = useContext(ContextApi);

  return context;
};
