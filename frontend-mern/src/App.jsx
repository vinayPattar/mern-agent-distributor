import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  )
}

export default App
