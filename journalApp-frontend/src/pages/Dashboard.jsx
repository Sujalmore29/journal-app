import React, { useEffect, useState } from 'react'
import { getAllEntries } from '../api/JournalApi';
import Navbar from '../components/Navbar';
import EntryCard from '../components/EntryCard';
import { getUserGreeting } from '../api/userApi';

const Dashboard = () => {
    const [entries, setentries] = useState([]);
    const [greeting, setgreeting] = useState("");

    useEffect(() => {
        getUserGreeting().then(res => setgreeting(res.data))
        .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        getAllEntries().then(res => setentries(Array.isArray(res.data) ? res.data : [])).catch(err => console.error(err));
    }, []);

    return(
        <div className='bg-gray-50 min-h-screen'>
            <Navbar />
            <h2 className='text-lg py-2 px-6 mb-2 text-gray-700'>{greeting}</h2>
            <div className='px-6 pb-10'>
            <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'>
                {entries.length === 0 && (
                    <p className='text-gray-500'>No journal entries yet.</p>)}
                    
                {entries.map(e => (
                    <EntryCard key={e.id || e._id} entry={e} />
                ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard