import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEntryById } from '../api/JournalApi';
import Navbar from '../components/Navbar';

const ViewEntry = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        getEntryById(id).then(res => setEntry(res.data));
    }, [id]);

    if(!entry) return null;
  return (
    <div>
        <Navbar />
        <div className='p-6 max-w-xl mx-auto'>
            <h1 className='text-2xl font-bold'>{entry.title}</h1>
            <p className='mt-4'>{entry.content}</p>

            <div className='mt-6 space-x-4'>
                <button onClick={() => navigate(`/entry/${id}/edit`)} className='bg-yellow-500 text-white px-3 py-1'>Edit</button>
                <button onClick={async () => {
                    await deleteEntry(id);
                    navigate("/");
                }}
                className='bg-red-600 text-white px-3 py-1'>Delete</button>
            </div>
        </div>
    </div>
  );
}

export default ViewEntry