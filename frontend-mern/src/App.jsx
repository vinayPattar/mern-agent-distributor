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
import AddAgent from './components/AddAgent'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* All routes in the application */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
          <Route path="add-csv" element={<ProtectedRoute><AddCSV /></ProtectedRoute>} />
          <Route path="add-agent" element={<ProtectedRoute><AddAgent /> </ProtectedRoute>} />
          <Route path="view" element={<ProtectedRoute><AgentTasks /> </ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
