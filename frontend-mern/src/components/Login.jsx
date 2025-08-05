import React, { useState } from "react";
import { useForm } from "react-hook-form"; // For form handling and validation
import { useNavigate } from "react-router-dom"; // For navigation after login
import api from "../services/api"; // Axios instance for API calls
import toast from 'react-hot-toast'; // For showing success/error toasts
import { useMyContext } from "../store/Context"; // Custom context to handle global token

const Login = ({ autoFocus }) => {
  // Access token from context, and a method to update it
  const { token, setToken } = useMyContext();
  const { email, setEmail } = useMyContext();
  const { role, setRole } = useMyContext();

  const navigate = useNavigate(); // React Router hook for navigation

  // useForm hook setup from react-hook-form
  const {
    register,       // Used to register input fields
    handleSubmit,   // Handles form submission
    reset,          // (Unused here) resets form values
    setError,       // (Unused here) sets error manually
    formState: { errors } // Contains validation errors
  } = useForm();

  // Function to handle form submission
  const handleForm = async (data) => {
    console.log(data); // Debug: log submitted form data
    try {
      // Send login request to backend
      const response = await api.post('/auth/login', data);
      console.log(response?.data); // Debug: log API response

      // Save token in global context
      setToken(response?.data?.token);
      localStorage.setItem("Email", response?.data?.user?.email)
      localStorage.setItem("Role", response?.data?.user?.role)
      setEmail(response?.data?.user?.email);
      setRole(response?.data?.user?.role)
      console.log(email);

      // Show success toast
      toast.success("Login Successful");

      // Navigate to dashboard
      (response?.data?.user?.role === 'admin') ? navigate('/dashboard') : navigate('/agent-dashboard');

    } catch (err) {
      console.log(err); // Debug: log error

      // Show error toast with backend message if available
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className='signup w-full min-h-[calc(100vh-74px)] flex justify-center items-center'>
      <form
        onSubmit={handleSubmit(handleForm)}
        className='w-360 lg:w-100 sm:w-100 mx-10 bg-white shadow-2xl py-6 sm:px-8 px-4 rounded-lg'
      >
        {/* Header */}
        <div className='my-3'>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Login Here
          </h1>
          <p className="text-slate-600 text-center leading-relaxed">
            Enter your credentials to Login
          </p>
        </div>

        {/* Form Fields */}
        <div className='flex flex-col gap-2'>
          {/* Email Input */}
          <div className='flex flex-col'>
            <input
              {...register('email', {
                required: 'email is required',
                minLength: { value: 5, message: 'Minimum 5 characters' }
              })}
              className={`px-2 py-2 ${autoFocus ? "border-0" : ""} outline-slate-500 bg-slate-100 text-gray-950 rounded-xl`}
              placeholder="Enter your username"
              defaultValue={"admin@example.com"}
              name="email"
              type="email"
            />
            {errors.email && (
              <p className="text-sm font-semibold text-red-500 mt-0">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <input
            {...register('password', {
              required: 'password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' }
            })}
            className={`px-2 py-2 ${autoFocus ? "border-0" : ""} outline-slate-500 bg-slate-100 text-gray-950 rounded-xl`}
            placeholder="Enter your password"
            defaultValue={"admin123"}
            name="password"
            type="password"
          />
          {errors.password && (
            <p className="text-sm font-semibold text-red-500 mt-0">{errors.password.message}</p>
          )}

          {/* Submit Button */}
          <input
            type="submit"
            value={'Login'}
            className='bg-[linear-gradient(to_right,#5345db,#de5afd)] hover:bg-[linear-gradient(to_right,#5347db,#de9afd)] transition-all 300s ease-in-out font-semibold text-white py-2 px-4 rounded-xl cursor-pointer'
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
