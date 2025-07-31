import React from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = ({ autoFocus }) => {

  const { register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }, } = useForm();

  const handleForm = async (data) => {
    try {
      console.log(data)
      const response = await api.post('/agent/add-agent', data);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err);
      console.log(err)
    }
  }

  return (
    <main className='min-h-screen w-full font-[Satoshi]'>
      <div className='mt-16 flex flex-col lg:flex-row'>
        <div className='bg-cyan-900 text-white w-full lg:w-1/5 lg:min-h-screen py-4 px-4'>

        </div>
        <div className='flex-2 lg:flex-1 bg-gray-100 p-3'>
          <div className=' m-20 '>
            <form onSubmit={handleSubmit(handleForm)} className='w-75 lg:w-100 sm:w-100 mx-0 lg:mx-10 bg-white shadow-2xl py-6 sm:px-8 px-4 rounded-lg ' >
              <div className='my-3'>
                <h1 className="font-montserrat text-center font-bold text-2xl">
                  Add agents
                </h1>
                <p className="text-slate-600 text-center ">
                  Add agents to collaborate and manage operations efficiently.
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col'>
                  <input {...register('name', {
                    required: 'name is required',
                    minLength: { value: 5, message: 'Minimum 5 characters' }
                  })}
                    className={`  px-2 py-2   ${autoFocus ? "border-0 " : ""
                      }   outline-slate-500 bg-slate-100  text-gray-950 rounded-xl`
                    } placeholder="Enter agent name"
                    name="name" type="text" />
                  {errors.name && (
                    <p className="text-sm font-semibold text-red-500 mt-0">{errors.name.message}</p>
                  )}
                </div>
                <div className='flex flex-col'>
                  <input {...register('email', {
                    required: 'email is required',
                    minLength: { value: 5, message: 'Minimum 5 characters' }
                  })}
                    className={`  px-2 py-2   ${autoFocus ? "border-0 " : ""
                      }   outline-slate-500 bg-slate-100  text-gray-950 rounded-xl`
                    } placeholder="Enter agent email"
                    name="email" type="email" />
                  {errors.email && (
                    <p className="text-sm font-semibold text-red-500 mt-0">{errors.email.message}</p>
                  )}
                </div>
                <input {...register('phoneno', {
                  required: 'phoneno is required',
                  minLength: { value: 10, message: 'Minimum 10 characters' }
                })} className={`  px-2 py-2   ${autoFocus ? "border-0 " : ""
                  }   outline-slate-500 bg-slate-100  text-gray-950 rounded-xl`}
                  placeholder="Enter agent phoneno" name="phoneno"
                  type="text" />
                {errors.phoneno && (
                  <p className="text-sm font-semibold text-red-500 mt-0">{errors.phoneno.message}</p>
                )}
                <input {...register('password', {
                  required: 'password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' }
                })} className={`  px-2 py-2   ${autoFocus ? "border-0 " : ""
                  }   outline-slate-500 bg-slate-100  text-gray-950 rounded-xl`}
                  placeholder="Enter agent password" name="password"
                  type="password" />
                {errors.password && (
                  <p className="text-sm font-semibold text-red-500 mt-0">{errors.password.message}</p>
                )}
                <input type="submit" value={'Add'} className='bg-[linear-gradient(to_right,#5345db,#de5afd)] hover:bg-[linear-gradient(to_right,#5347db,#de9afd)] transition-all 300s ease-in-out  text-white py-2 font-bold px-4 rounded-xl cursor-pointer ' name="" id="" />

              </div>
            </form>
          </div>
        </div>

      </div>
    </main>
  )
}

export default Dashboard
