import React, { useState } from 'react'
import { login } from '../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthLayout from '../components/AuthLayout';

function Login () {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const res = await login({username, password});

            //save JWT token
            localStorage.setItem("token",res.data);

            navigate("/");
            toast.success("Login successful!");
        }catch(err){
            toast.error("Login failed. Invalid Username or Password.");
        }
    };

  return (
    <AuthLayout title={"Welcome Back 👋"} subtitle={"Login to continue journaling"}>
        <input className='input'
        placeholder='Username'
        onChange={(e) => setusername(e.target.value)} />

        <input type='password'
        className='input mt-3'
        placeholder='Password'
        onChange={(e) => setpassword(e.target.value)} />

        <button onClick={handleLogin} className='btn-primary mt-5'>
            Login
        </button>

        <p className='text-center text-sm mt-4 text-gray-600'>
            New here?{" "}
            <Link to="/signup" className='text-indigo-600 font-medium'>
            Create an account</Link>
        </p>
    </AuthLayout>
  );
};

export default Login