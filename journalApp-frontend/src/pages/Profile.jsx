import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteUser, getProfile, getUserGreeting, updateUser } from '../api/userApi';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import ProfileCalendar from '../components/ProfileCalendar';
import { getAllEntries } from '../api/JournalApi';

const Profile = () => {

    const [greeting, setGreeting] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        getUserGreeting()
        .then(res => setGreeting(res.data))
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        getProfile().then(res => setUser(res.data)).catch(err => console.error(err));

        getAllEntries().then(res =>  setEntries(Array.isArray(res.data) ? res.data : [])).catch(err => console.error(err));
    }, []);

    const handleUpdate = async () => {
        try{
            await updateUser({ username, password});
            localStorage.removeItem("token");
            navigate("/login");
            toast.success("Profile updated.");
        } catch(err){
            toast.error("Update failed. Please try again.");
        }
    };

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete your account?");
        if(!confirm) return;

        try{
            await deleteUser();
            localStorage.removeItem("token");
            navigate("/signup");
            toast.success("Account deleted successfully.");
        } catch(err) {
            toast.error("Account deletion failed. Please try again.");
        }
    };

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <div className='max-w-4xl mx-auto p-6'>

                {/* PROFILE CARD */}
                <div className='bg-white rounded-2xl shadow-md p-6 flex items-center gap-6'>
                    {/* AVATAR */}
                    <div className='w-20 h-20 rounded-full bg-linear-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white text-3xl font-bold'>
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>

                    {/* USER INFO */}
                    <div>
                        <h2 className='text-2xl font-bold text-gray-800'>{user?.username}</h2>

                        <span className='inline-block mt-1 px-3 py-0.5 rounded-full text-sm bg-indigo-100 text-indigo-700'>
                            {user?.roles?.includes("ROLE_ADMIN") ? "Admin" : "User"}
                        </span>
                    </div>
                </div>

                {/* STATS */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6'>
                    <div className='bg-white rounded-2xl shadow-md p-5 text-center'>
                        <h3 className='text-gray-500 text-sm'>Total Entries</h3>
                        <p className='text-3xl font-bold text-indigo-600'>{entries.length}</p>
                    </div>

                    {/*EDIT PROFILE */}
                    <div className='bg-white rounded-2xl shadow-md p-5 flex flex-col  justify-center items-center gap-2'>
                        <button onClick={() => navigate("/edit-profile")}
                        className='bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700'>
                            Edit Profile
                        </button>
                    </div>

                    <div className='bg-white rounded-2xl shadow-md p-5 flex flex-col justify-center items-center gap-2'>
                        <button onClick={() => {
                            toast.success("Logged out");
                            navigate("/login");
                        }}
                        className='bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-black'>
                            Logout
                        </button>
                    </div>
                </div>

                {/* CALENDAR */}
                <div className='mt-8'>
                    <h3 className='text-lg font-semibold mb-3 text-gray-700'>
                        WRITING ACTIVITY
                    </h3>
                    <ProfileCalendar entries={entries} />
                    <div className='mt-10 text-center'>
                        <button onClick={handleDelete}
                        className='text-red-600 border border-red-500 px-6 py-2 rounded-full hover:bg-red-600 hover:text-white'>
                            Delete Account Permanently
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;