import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AddCSV from './components/AddCsv'
import AgentTasks from './components/AgentTasks'


function App() {

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-csv" element={<AddCSV />} />
        <Route path="/view" element={<AgentTasks />} />
      </Routes>
    </>
  )
}

export default App
