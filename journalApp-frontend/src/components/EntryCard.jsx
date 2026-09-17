import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaBook, FaBookOpen, FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import { deleteEntryById } from '../api/JournalApi';
import { motion } from "framer-motion";

const SENTIMENT_CONFIG = {
    HAPPY: {
        emoji: "😊",
        label: "HAPPY",
    },
    SAD: {
        emoji: "😢",
        label: "SAD",
    },
    ANGRY: {
        emoji: "😡",
        label: "ANGRY",
    },
    EXCITED: {
        emoji: "🤩",
        label: "EXCITED",
    },
    CALM: {
        emoji: "😌",
        label: "CALM",
    },
    ANXIOUS: {
        emoji: "😰",
        label: "ANXIOUS",
    },
    MOTIVATED: {
        emoji: "💪",
        label: "MOTIVATED",
    },
    TIRED: {
        emoji: "😴",
        label: "TIRED",
    },
    GRATEFUL: {
        emoji: "🙏",
        label: "GRATEFUL",
    },
    STRESSED: {
        emoji: "😫",
        label: "STRESSED",
    },
};

const EntryCard = ({ entry }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const sentiment = entry.sentiment ? SENTIMENT_CONFIG[String(entry.sentiment).toUpperCase()] : null;
  
  const preview = entry.content.length > 150 ? entry.content.substring(0,150) + "..." : entry.content;

  const handleDelete = async () => {
    if(!window.confirm("Delete this journal?")) return;

    try{
      await deleteEntryById(entry.id || entry._id);
      toast.success("Entry deleted");
      window.location.reload();
    }catch{
      toast.error("Delete failed!");
    }
  }

  return (
    <div>
      {/* Entry Card */}
      <div className='break-inside-avoid bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden'>
        {/* Header */}
        <div className='h-28 bg-linear-to-r from-indigo-600 to-purple-500' />

        {/* BODY */}
        <div className='p-4'>
          <div className='flex items-start justify-between gap-3'>
            <h3 className='font-bold text-lg mb-2 text-gray-800'>
            {entry.title}
          </h3>

        {/* SENTIMENT */}
          {sentiment && (
            <motion.div 
              initial={{ opacity: 0,scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"
            title={`Sentiment: ${sentiment.label}`}>
    
              <span>{sentiment.emoji}</span>
              <span className='text-sm font-medium text-gray-600'>{sentiment.label}</span>
              
            </motion.div>
          )}
          </div>
          <p className='text-gray-600 text-sm whitespace-pre-line'>{preview}</p>
        </div>

        {/* // ACTION bar */}
        <div className='flex justify-between items-center px-4 pb-4'>

          {/* //EDIT */}
          <button onClick={() => navigate(`/edit/${entry.id}`)}
          className='text-indigo-600 hover:text-indigo-800' title='Edit'>
            <FaEdit size={18} />
          </button>

          {/* //READ MORE */}
          <button onClick={() => setOpen(true)}
          className='bg-indigo-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-2 hover:bg-indigo-700'>
            <FaBookOpen size={14} /> Read
          </button>

          {/* //Delete */}
          <button onClick={handleDelete} 
          className='text-red-500 hover:text-red-700'
          title='Delete'>
            <FaTrash size={18} />
          </button>
        </div>
      </div>

      {/* //READ MORE MODAL */}
      {open && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3'>
          <div className='bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden'>
            <div className='p-4 border-b'>
            <h2 className='text-xl font-bold text-gray-800'>
              {entry.title}
            </h2>
            </div>

            <div className='p-4 overflow-y-auto flex-1 text-gray-700 whitespace-pre-line'>
              {entry.content}
            </div>
            <div className='text-right border-t p-4'>
              <button onClick={() => setOpen(false)} 
              className='bg-indigo-600 text-white px-5 py-1.5 rounded-full hover:bg-indigo-700'>
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default EntryCard