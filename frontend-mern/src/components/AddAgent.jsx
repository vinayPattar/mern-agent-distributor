import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddAgent = ({ autoFocus }) => {
  // Navigation hook to redirect after successful agent creation
  const navigate = useNavigate();

  // useForm handles form validation, submission, and errors
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const handleForm = async (data) => {
    try {
      console.log(data);
      // Send POST request to add a new agent
      const response = await api.post('/agent/add-agent', data);
      toast.success(response.data.message); // Show success toast
      navigate('view'); // Redirect to view agents page
    } catch (err) {
      // Display error message in toast and log it
      toast.error(err?.message || 'Something went wrong');
      console.log(err);
    }
  };

  return (
    <div className='p-6 max-w-md mx-auto mt-20 rounded-2xl flex flex-col items-center gap-4'>
      <form
        onSubmit={handleSubmit(handleForm)}
        className='w-75 lg:w-100 sm:w-100 mx-0 lg:mx-10 bg-white shadow-2xl py-6 sm:px-8 px-4 rounded-lg'
      >
        {/* Header Section */}
        <div className='my-3'>
          <h1 className='font-montserrat text-center font-bold text-2xl'>
            Add agents
          </h1>
          <p className='text-slate-600 text-center'>
            Add agents to collaborate and manage operations efficiently.
          </p>
        </div>

        {/* Form Fields */}
        <div className='flex flex-col gap-2'>

          {/* Agent Name Field */}
          <div className='flex flex-col'>
            <input
              {...register('name', {
                required: 'name is required',
                minLength: { value: 3, message: 'Minimum 3 characters' },
              })}
              className={`px-2 py-2 ${autoFocus ? 'border-0' : ''} outline-slate-500 bg-slate-100 text-gray-950 rounded-xl`}
              placeholder='Enter agent name'
              name='name'
              type='text'
            />
            {errors.name && (
              <p className='text-sm font-semibold text-red-500 mt-0'>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Agent Email Field */}
          <div className='flex flex-col'>
            <input
              {...register('email', {
                required: 'email is required',
                minLength: { value: 5, message: 'Minimum 5 characters' },
              })}
              className={`px-2 py-2 ${autoFocus ? 'border-0' : ''} outline-slate-500 bg-slate-100 text-gray-950 rounded-xl`}
              placeholder='Enter agent email'
              name='email'
              type='email'
            />
            {errors.email && (
              <p className='text-sm font-semibold text-red-500 mt-0'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Agent Phone Number Field */}
          <input
            {...register('phoneno', {
              required: 'phoneno is required',
              minLength: { value: 10, message: 'Minimum 10 characters' },
            })}
            className={`px-2 py-2 ${autoFocus ? 'border-0' : ''} outline-slate-500 bg-slate-100 text-gray-950 rounded-xl`}
            placeholder='Enter agent phoneno'
            name='phoneno'
            type='text'
          />
          {errors.phoneno && (
            <p className='text-sm font-semibold text-red-500 mt-0'>
              {errors.phoneno.message}
            </p>
          )}

          {/* Agent Password Field */}
          <input
            {...register('password', {
              required: 'password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
            className={`px-2 py-2 ${autoFocus ? 'border-0' : ''} outline-slate-500 bg-slate-100 text-gray-950 rounded-xl`}
            placeholder='Enter agent password'
            name='password'
            type='password'
          />
          {errors.password && (
            <p className='text-sm font-semibold text-red-500 mt-0'>
              {errors.password.message}
            </p>
          )}

          {/* Submit Button */}
          <input
            type='submit'
            value='Add'
            className='bg-[linear-gradient(to_right,#5345db,#de5afd)] hover:bg-[linear-gradient(to_right,#5347db,#de9afd)] transition-all 300s ease-in-out text-white py-2 font-bold px-4 rounded-xl cursor-pointer'
          />
        </div>
      </form>
    </div>
  );
};

export default AddAgent;
