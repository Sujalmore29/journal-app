import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getEntryById, updateEntryById } from '../api/JournalApi';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const EditEntry = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getEntryById(id).then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setloading(false);
    })
    .catch(() => {
      toast.error("failed to load entry");
      navigate("/");
    });
  }, [id,navigate]);

  const update = async () => {
    try{
      await updateEntryById(id,{title,content});
      toast.success("Journal entry updated successfully!");
      navigate("/");
    } catch(err){
      toast.error("Update failed. Please try again.");
    }
  };

  if(loading){
    return <div className='p=6 text-center'>Loading...</div>
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
        <Navbar />
        
        <div className='max-w-3xl mx-auto p-6 bg-white rounded-2xl shadows-md mt-6'>

          <h2 className='text-2xl font-bold mb-4 text-gray-800'>
            Edit Journal Entry
          </h2>
          <input className='border w-full p-2 rounded mb-4' 
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Title' />

          <textarea
          className='border w-full p-2 rounded h-48 mb-4'
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder='Content' />

          <div className='flex justify-end gap-4'>
            <button onClick={() => navigate("/")}
            className='text-gray-600'>
              Cancel
            </button>
            <button onClick={update}
            className='bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700'>
              Save Changes
            </button>
          </div>
        </div>
    </div>
  );
};

export default EditEntry