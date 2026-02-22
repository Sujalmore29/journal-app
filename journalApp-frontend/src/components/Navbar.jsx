
import { Link, useNavigate } from 'react-router-dom'
import { isAdmin } from '../utils/auth';
import { getProfile } from '../api/userApi';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setuser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then(res => setuser(res.data)).catch(err => console.error(err));
  }, []);
 
  return (
    <div className='bg-indigo-600 text-white px-6 py-4 flex justify-between'>
        <h1 className='font-bold text-xl'>Journal App</h1>
        <div className='space-x-4 flex items-center'>
            <Link to="/">Dashboard</Link>
            <Link to="/create">New Entry</Link>
            {isAdmin() && (
              <Link to="/admin/users">Admin</Link>)}
            <div className='hover:shadow-2xl'>
            {user?.username && (
              <div onClick={() => navigate("/profile")}
              className='flex items-center gap-3 cursor-pointer'>
                <div className='w-10 h-10 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold hover:bg-indigo-500'>
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            </div>
        </div>
    </div>
  );
}

export default Navbar