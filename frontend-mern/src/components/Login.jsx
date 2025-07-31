import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from 'react-hot-toast';

const Login = ({ autoFocus }) => {

  const navigate = useNavigate();
  const { register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }, } = useForm();


  const handleForm = async (data) => {
    console.log(data)
    try {
      const response = await api.post('/auth/login', data);
      console.log(response.data);
      toast.success("Login Successful");
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      toast.error(err);
    }

  }

  return (
    <div className='signup w-full min-h-[calc(100vh-74px)] flex justify-center items-center'>
      <form onSubmit={handleSubmit(handleForm)} className='w-360 lg:w-100 sm:w-100 mx-10 bg-white shadow-2xl py-6 sm:px-8 px-4 rounded-lg ' >
        <div className='my-3'>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Login Here
          </h1>
          <p className="text-slate-600 text-center">
            Enter your credentials to Login
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <input {...register('email', {
              required: 'email is required',
              minLength: { value: 5, message: 'Minimum 5 characters' }
            })}
              className={`  px-2 py-2   ${autoFocus ? "border-0 " : ""
                }   outline-slate-500 bg-slate-100  text-gray-950 rounded-xl`
              } placeholder="Enter your username"
              defaultValue={"admin@example.com"}
              name="email" type="email" />
            {errors.username && (
              <p className="text-sm font-semibold text-red-500 mt-0">{errors.username.message}</p>
            )}
          </div>
          <input {...register('password', {
            required: 'password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' }
          })} className={`  px-2 py-2   ${autoFocus ? "border-0 " : ""
            }   outline-slate-500 bg-slate-100  text-gray-950 rounded-xl`} placeholder="Enter your password" name="password"
            defaultValue={"admin123"}
            type="password" />
          {errors.password && (
            <p className="text-sm font-semibold text-red-500 mt-0">{errors.password.message}</p>
          )}
          <input type="submit" value={'Login'} className='bg-[linear-gradient(to_right,#5345db,#de5afd)] hover:bg-[linear-gradient(to_right,#5347db,#de9afd)] transition-all 300s ease-in-out  text-white py-2 px-4 rounded-xl cursor-pointer ' name="" id="" />

        </div>
      </form>

    </div>
  );
};

export default Login;
