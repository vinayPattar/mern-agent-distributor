import React from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form';
import { useMyContext } from '../store/Context';

const UpdateAgent = ({ autoFocus }) => {

  const { email } = useMyContext();
  console.log(email)

  const {
    register,       // Used to register input fields
    handleSubmit,   // Handles form submission
    reset,          // (Unused here) resets form values
    setError,       // (Unused here) sets error manually
    formState: { errors } // Contains validation errors
  } = useForm();

  const handleForm = async (data) => {
    console.log(data);
    try {
      const response = await api.put(`/agent/update?email=${email}`, data);
      toast.success("Details Updated Successfully");
      console.log(response.data);
    } catch (err) {
      toast(err?.response?.data?.message || "Something went wrong!");
      console.log(err)
    }

  }
  return (
    <div className='p-6 max-w-md mx-auto mt-20 rounded-2xl  items-center gap-4'>
      <form
        onSubmit={handleSubmit(handleForm)}
        className='w-75 lg:w-100 sm:w-100 mx-0 lg:mx-30 bg shadow-lg py-6 sm:px-8 px-4 rounded-lg'
      >
        {/* Header Section */}
        <div className='my-3'>
          <h1 className='font-montserrat text-center font-bold text-2xl'>
            Update your details
          </h1>

        </div>

        {/* Form Fields */}
        <div className='flex flex-col gap-2'>

          {/* Agent Name Field */}
          <div className='flex flex-col'>
            <input
              {...register('name')}
              className={`px-2 py-2 ${autoFocus ? 'border-0' : ''} outline-slate-500 bg-slate-100 text-gray-950 rounded-xl`}
              placeholder='Enter agent name'
              name='name'
              type='text'
            />

          </div>



          {/* Agent Phone Number Field */}
          <input
            {...register('phoneno')}

            className={`px-2 py-2 ${autoFocus ? 'border-0' : ''} outline-slate-500 bg-slate-100 text-gray-950 rounded-xl`}
            placeholder='Enter agent phoneno'
            name='phoneno'
            type='text'
          />




          {/* Submit Button */}
          <input
            type='submit'
            value='Add'
            className='bg-[linear-gradient(to_right,#5345db,#de5afd)] hover:bg-[linear-gradient(to_right,#5347db,#de9afd)] transition-all 300s ease-in-out text-white py-2 font-bold px-4 rounded-xl cursor-pointer'
          />
        </div>
      </form>
    </div>
  )
}

export default UpdateAgent
