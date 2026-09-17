import React from 'react'
import { useMemo } from 'react';
import { motion } from 'framer-motion';

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

const WeeklySentiment = ({ entries = [] }) => {
    const weeklyData = useMemo(() => {
        const today = new Date();

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const counts = {};

        Object.keys(SENTIMENT_CONFIG).forEach(sentiment => {
            counts[sentiment] = 0;
        });

        entries.forEach(entry => {
            if(!entry.date || !entry.sentiment){
                return;
            }

            const entryDate = new Date(entry.date);

            if(entryDate >= sevenDaysAgo && 
               entryDate <= today)
               {
                const sentiment = String(entry.sentiment).toUpperCase();

                if(counts[sentiment] !== undefined){
                    counts[sentiment]++;
                }
            }
        }); 

        const total = Object.values(counts)
                        .reduce((sum, value) => sum + value, 0);

        const sorted = Object.entries(counts).filter(([_, count]) => count > 0).sort((a, b) => b[1] - a[1]);

        const mostFrequent = sorted.length > 0 ? sorted[0][0] : null;
        
        return {
            counts,
            total,
            sorted,
            mostFrequent
        };
    }, [entries]);

    if(weeklyData.total === 0){
        return (
            <motion.div 
                initial = {{ opacity: 0, y: 20 }}
                animate = {{ opacity: 1, y: 0 }}
                className='bg-white rounded-2xl shadow-md p-6 border border-gray-100'>
                    <div className='flex items-center justify-between mb-4'>
                        <div>
                            <h3 className='text-xl font-bold text-gray-800'>This Week</h3>

                            <p className='text-sm text-gray-500 mt-1'>
                                Your emotional activity
                            </p>
                        </div>

                        <div className='text-3xl'>
                            🌱
                        </div>
                    </div>

                    <div className='text-center py-8'>
                        <div className='text-4xl mb-3'>
                            ✍️
                        </div>
                        <p className='text-gray-600 font-medium'>
                            No sentiment data yet
                        </p>

                        <p className='text-sm text-gray-400 mt-1'>
                            Write a journal entry to start tracking your mood.
                        </p>
                    </div>
            </motion.div>
        );
    }

    const mostFrequentCount = weeklyData.counts[weeklyData.mostFrequent];

    const mostFrequentPercentage = Math.round((mostFrequentCount / weeklyData.total) * 100);

  return (
    <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            
            {/* HEADER */}
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h3 className='text-xl font-bold text-gray-800'>This Week</h3>
                    <p className='text-sm text-gray-500 mt-1'>
                        Your journal sentiment
                    </p>
                </div>

                <div className='w-11 h-11 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl shadow-md'>📊</div>
            </div>

                {/* MOST FREQUENT SENTIMENT */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-xl p-5 mb-7">
                        <p className='text-sm text-gray-500 mb-2'>
                            Your dominant sentiment
                        </p>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <span className='text-4xl'>
                                    {SENTIMENT_CONFIG[weeklyData.mostFrequent].emoji}
                                </span>

                                <div>
                                    <h4 className='text-xl font-bold text-gray-800'>
                                        {SENTIMENT_CONFIG[weeklyData.mostFrequent].label}
                                    </h4>
                                    <p className='text-sm text-gray-500'>Most frequent this week</p>
                                </div>
                            </div>

                            <div className='text-right'>
                                <p className='text-2xl font-bold text-indigo-600'>{mostFrequentPercentage}%</p>
                                <p className='text-xs text-gray-500'>of entries</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* SENTIMENT BARS */}
                    <div className='space-y-5'>
                        {weeklyData.sorted.map(([sentiment, count], index) => {
                            const percentage = Math.round((count / weeklyData.total) * 100);

                            const config = SENTIMENT_CONFIG[sentiment];

                            return (
                                <motion.div
                                    key={sentiment}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.08 }}>
                                        { /* LABEL */ }
                                        <div className='flex justify-between items-center mb-2'>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-xl'>{config.emoji}</span>
                                                <span className='font-semibold text-gray-700 text-sm'>{config.label}</span>
                                            </div>
                                                <span className='text-sm font-semibold text-gray-500'>{percentage}%</span>
                                        </div>

                                            {/* BAR */}
                                            <div className='h-3 bg-gray-100 rounded-full overflow-hidden'>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    transition={{ duration: 0.8,
                                                        delay: 0.3 + index * 0.08
                                                     }}
                                                     className="h-full bg-linear-to-br from-indigo-500 to-purple-500 rounded-full" />
                                            </div>
                                    </motion.div>
                            );
                        }
                    )}
                </div>

                {/* FOOTER */}
                <div className='mt-7 pt-4 border-t border-gray-100 flex justify-between text-sm'>
                    <span className='text-gray-500'>
                        Entries this week
                    </span>
                    <span className='font-bold text-indigo-600'>
                        {weeklyData.total}
                    </span>
                </div>
    </motion.div>
  )
}

export default WeeklySentiment