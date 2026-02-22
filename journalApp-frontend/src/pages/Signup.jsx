import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/authApi';
import toast from 'react-hot-toast';
import AuthLayout from '../components/AuthLayout';

function Signup () {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try{
            await signup({username, password});
            navigate("/login");
            toast.success("Signup successful! Please login.");
        } catch(err){
            toast.error("Signup failed. Please try again.");
        }
    };
    
  return (
    <AuthLayout title="Create Account ✨" 
    subtitle="Start writing your journey today">

        <input className='input' placeholder='Username'
        onChange={(e) => setusername(e.target.value)} />

        <input type="password"
        className='input mt-3'
        placeholder='Password'
        onChange={(e) => setpassword(e.target.value)} />

        <button onClick={handleSignup} className='btn-success mt-5'>
            Sign Up
        </button>

        <p className='text-center text-sm mt-4 text-gray-600'>
            Already registered?{" "}
            <Link to="/login" className='text-indigo-600 font-medium'>
            Login</Link>
        </p>
    </AuthLayout>
  );
};

export default Signup