import React from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api';
import toast from 'react-hot-toast';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = ({ autoFocus }) => {



  return (
    // Dashboard for all the activities and functionalities
    <main className=' w-full font-[Satoshi]'>
      <div className=' flex flex-col lg:flex-row'>
        {/* Sidebar of the Dasboard */}
        <div className='bg-cyan-900 text-white w-full h-40  text-center lg:w-1/5 lg:h-screen py-4 lg:py-4 px-4'>
          <div className=' text-xl font-semibold flex lg:flex-col gap-6 my-20 mx-2'>
            <Link to={'add-agent'}>Add Agent</Link>
            <Link to={'add-csv'}>Add CSV File</Link>
            <Link to={'view'}>View Agents</Link>
          </div>
        </div>
        <div className='flex-2 lg:flex-1 bg-gray-100 p-3'>
          <Outlet />
        </div>

      </div>
    </main>
  )
}

export default Dashboard
