import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { createEntry } from '../api/JournalApi'
import toast from 'react-hot-toast'

function CreateEntry () {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate();

    const saveEntry = async () => {
        try{
        await createEntry({title,content});
        navigate("/");
        toast.success("Journal entry created successfully!");
        } catch(err){
            toast.error("Failed to create entry. Please try again.");
        }
    };

  return (
    <div className='bg-gray-50 min-h-screen'>
        <Navbar />
        <div className='max-w-3xl mx-auto p-6 bg-white rounded-2xl shadows-md mt-6'>

            <h2 className='text-2xl font-bold mb-4 text-gray-800'>
                Add Journal
            </h2>
            <input className='border w-full px-4 py-2 rounded-3xl mb-4'
            placeholder='Title'
            onChange={e => setTitle(e.target.value)}/>

            <textarea 
            className='border w-full p-4 rounded-3xl h-60 mb-4'
            placeholder='Write your journal...'
            rows={6}
            onChange={e => setContent(e.target.value)}/>
            <button onClick={saveEntry}
            className='bg-indigo-600 text-white px-6 py-2 rounded-full
            hover:bg-indigo-700'>
                Save
            </button>
        </div>
    </div>
  );
}

export default CreateEntry