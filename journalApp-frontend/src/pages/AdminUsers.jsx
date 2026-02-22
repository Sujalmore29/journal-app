import React, { useEffect, useState } from 'react'
import { deleteUserByAdmin, getAllUsers, promoteToAdmin } from '../api/adminApi';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { FaSync, FaTrash, FaUserShield } from 'react-icons/fa';

const AdminUsers = () => {
const [users, setUsers] = useState([]);

const loadUsers = () => {
    getAllUsers().then(res => setUsers(res.data || []))
    .catch(() => toast.error("Failed to load users"));
}

useEffect(() => {
    loadUsers();
}, []);

useEffect(() => {
    getAllUsers().then(res => {
        if(Array.isArray(res.data)) {
            setUsers(res.data);
        }else{
            setUsers([]);
        }
    })
    .catch(err => {
        console.error(err);
        toast.error("Failed to load users (Admin only).");
    });
}, []);

//Promote User to Admin
const makeAdmin = async (username) => {
    try{
        await promoteToAdmin(username);
        toast.success("User promoted to ADMIN successfully.");
        
        setUsers(prev => prev.map(u => u.username === username ? { ...u, roles: [...(u.roles || []), "ROLE_ADMIN"] } : u));
        loadUsers();
    }catch{
        toast.error("Promotion Failed!");
    }
};

//Delete User
const deleteUser = async (username) => {
    if(!window.confirm("Delete this user permanently?")) return;

    try{
        await deleteUserByAdmin(username);
        toast.success("User deleted successfully.");
        loadUsers();
    }catch {
        toast.error("Failed to delete user. Please try again.");
    }
};

//Refresh Cache
const handleRefreshCache = async () => {
    try{
        await refreshCache();
        toast.success("Cache refreshed new weather data loaded.");
    }catch{
        toast.error("Cache refresh failed!");
    }
};

  return (
    <div className='min-h-screen bg-gray-50'>
    <Navbar />

      <div className='px-6 py-8 max-w-6xl mx-auto'>
        <div className='flex items-center justify-between mb-6'>
            <div>
                <h1 className='text-3xl font-bold text-gray-800'>Admin Panel</h1>
                <p className='text-gray-500 mt-1'>
                    Manage users & system cache
                </p>
            </div>

            <button onClick={handleRefreshCache}
            className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow'>
                <FaSync />
                Refresh Cache
            </button>
        </div>

        {/* USERS CARD */}
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
            <div className='px-6 py-4 border-b'>
                <h2 className='text-xl font-semibold text-gray-700'>
                    Users
                </h2>
            </div>

            <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                    <thead className='bg-gray-100 text-gray-600 uppercase text-xs'>
                        <tr>
                            <th className='px-4 py-3 text-left'>#</th>
                            <th className='px-4 py-3 text-left'>Username</th>
                            <th className='px-4 py-3 text-left'>Roles</th>
                            <th className='px-4 py-3 text-center'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user,index) => {
                            const isAdmin = user.roles?.includes("ADMIN");

                            return (
                                <tr key={user.username}
                                className='border-b hover:bg-gray-50 transition'>
                                    <td className='px-4 py-3'>{index + 1}</td>
                                    <td className='px-4 py-3 font-medium'>
                                        {user.username}
                                    </td>

                                    <td className='px-4 py-3 space-x-2'>
                                        {user.roles?.map(role => (
                                            <span key={role}
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                                                ${
                                                    role === "Role_ADMIN"? "bg-purple-100 text-purple-700"
                                                    :"bg-blue-100 text-blue-700"
                                                }`}>
                                                    {role.replace("ROLE_","")}
                                                </span>
                                        ))}
                                    </td>

                                    <td className='px-4 py-3 text-center space-x-2'>
                                        {!isAdmin && (
                                            <button onClick={() => makeAdmin(user.username)}
                                            className='inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs'>
                                                <FaUserShield />
                                                Promote
                                            </button>
                                        )}
                                        <button onClick={() => deleteUser(user.username)}
                                        className='inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs'>
                                            <FaTrash />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <p className='text-center py-6 text-gray-500'>
                    No User Found
                </p>
            )}
        </div>
      </div>
    </div>
  );

}
export default AdminUsers