import React from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api';
import toast from 'react-hot-toast';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMyContext } from '../store/Context';


const AgentDashboard = ({ autoFocus }) => {

  const navigate = useNavigate();
  const { setToken } = useMyContext();
  const { role } = useMyContext();


  const handleLogout = () => {
    localStorage.removeItem("JWT_TOKEN");
    setToken(null);
    toast.success("Logged out successfully")
    navigate('/');
  }


  return (
    // Dashboard for all the activities and functionalities
    <main className=' w-full font-[Satoshi]'>
      <div className=' flex flex-col lg:flex-row'>
        {/* Sidebar of the Dasboard */}
        <div className='fixed bg-cyan-900 text-white w-full h-40  text-center lg:w-1/5 lg:min-h-screen py-4 lg:py-4 px-4'>
          <div className=' text-xl font-semibold flex flex-col items-center justify-end gap-120 my-20 mx-2'>
            <div className='flex flex-col '>
              <Link to={'add-agent'}>Add Agent</Link>
              <Link to={'add-csv'}>Add CSV File</Link>
              {role === 'admin' ? <Link to={'view'}>View Agents</Link> :
                <Link to={'agent-tasks'}>View your tasks</Link>}
              {role === 'agent' && <Link to={'details'}>Your Details</Link>}
              {role === 'agent' && <Link to={'update-info'}>Update Your Details</Link>}
            </div>
            <div className='w-full h-10'>
              <p onClick={handleLogout} className='bg-red-600 h-10 text-center py-2 text-black px-1 rounded-lg cursor-pointer'>Logout</p>
            </div>
          </div>
        </div>
        <div className='flex-2 lg:flex-1 bg-gray-100 p-3'>
          <Outlet />

        </div>


      </div>
    </main>
  )
}

export default AgentDashboard
