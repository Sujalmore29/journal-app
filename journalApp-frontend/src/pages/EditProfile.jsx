import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getProfile, updateUser } from '../api/userApi';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const EditProfile = () => {

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getProfile().then(res => {
            setusername(res.data.username);
        })
        .catch(err => {
            console.error(err);
            toast.error("Failed to load profile");
        });
    }, []);

    const handleUpdate = async() => {
        try{
            await updateUser({ username,password });
            localStorage.removeItem("token");
            toast.success("Profile updated. Please login again");
            navigate("/login");
        } catch (err){
            console.error(err);
            toast.error("Update failed. Please try again.");
        }
    };

  return (
    <div className='bg-gray-50 min-h-screen'>
        <Navbar />
        <div className='max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-md p-6'>
            <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
                Edit Profile
            </h2>

            {/* Username */}
            <div className='mb-4'>
                <label className='block text-sm text-gray-600 mb-1'>
                    Username
                </label>
                <input type='text'
                value={username}
                onChange={e => setusername(e.target.value)}
                className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-indigo-500' />
                </div>
                { /* PASSWORD */ }
                <div className='mb-6'>
                    <label className='block text-sm text-gray-600 mb-1'>
                        New Password
                    </label>
                    <input type="password"
                    placeholder='Leave empty to keep current password'
                    value={password}
                    onChange={e => setpassword(e.target.value)}
                    className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500' />
                    </div>

                        { /* ACTIONS */}
                        <div className='flex justify-between items-center'>
                            <button onClick={() => navigate("/profile")}
                            className='text-gray-600 hover:text-gray-800'>
                                Cancel
                            </button>

                            <button onClick={handleUpdate} className='bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700'>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
  );
};

export default EditProfile