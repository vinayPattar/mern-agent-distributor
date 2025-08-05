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
import AgentTask from './components/AgentTask'
import UpdateAgent from './components/UpdateAgent'
import AgentDetails from './components/AgentDetails'
import { useMyContext } from './store/Context'
import AgentDashboard from './components/AgentDashboard'


function App() {

  const { role } = useMyContext();

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* All routes in the application */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/dashboard" adminPage={true} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
          <Route path="add-csv" element={<ProtectedRoute><AddCSV /></ProtectedRoute>} />
          <Route path="add-agent" element={<ProtectedRoute><AddAgent /></ProtectedRoute>} />
          <Route adminPage={true} path="view" element={<ProtectedRoute><AgentTasks /></ProtectedRoute>} />

        </Route>
        <Route path="/agent-dashboard" element={<ProtectedRoute><AgentDashboard /></ProtectedRoute>} >
          <Route path="add-csv" element={<ProtectedRoute><AddCSV /></ProtectedRoute>} />
          <Route path="add-agent" element={<ProtectedRoute><AddAgent /></ProtectedRoute>} />
          <Route path="agent-tasks" element={<ProtectedRoute><AgentTask /></ProtectedRoute>} />
          <Route path="update-info" element={<ProtectedRoute><UpdateAgent /></ProtectedRoute>} />
          <Route path="details" element={<ProtectedRoute><AgentDetails /></ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
