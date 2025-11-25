import React, { useState } from 'react';
import { readingPlanData } from '../data';
import { ReadingPlanItem } from '../types';
import { CheckCircle2, Circle, Calendar } from 'lucide-react';

const ReadingTracker: React.FC = () => {
  const [readings, setReadings] = useState<ReadingPlanItem[]>(readingPlanData);

  const toggleReading = (id: string) => {
    setReadings(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = readings.filter(r => r.completed).length;
  const progress = Math.round((completedCount / readings.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">Plan de Lecture</h2>
          <p className="text-slate-600 dark:text-slate-400">Suivez votre progression quotidienne sur 60 jours.</p>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
           <div className="w-12 h-12 rounded-full border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center relative">
              <span className="text-xs font-bold text-bible-600">{progress}%</span>
              <svg className="absolute w-full h-full -rotate-90">
                 <circle 
                   cx="22" cy="22" r="20" 
                   fill="none" 
                   stroke="#c58650" 
                   strokeWidth="4"
                   strokeDasharray={`${progress * 1.25} 125`} // approx circumference
                   className="transition-all duration-1000"
                 />
              </svg>
           </div>
           <div>
             <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{completedCount} / {readings.length}</p>
             <p className="text-xs text-slate-500">Jours complétés</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {readings.map((reading) => (
          <div 
            key={reading.id}
            onClick={() => toggleReading(reading.id)}
            className={`
              cursor-pointer p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden
              ${reading.completed 
                ? 'bg-bible-50 border-bible-200 dark:bg-bible-900/20 dark:border-bible-800' 
                : 'bg-white border-slate-200 hover:border-bible-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700'
              }
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`
                text-xs font-medium px-2 py-1 rounded-full 
                ${reading.completed 
                  ? 'bg-bible-100 text-bible-800 dark:bg-bible-800 dark:text-bible-100' 
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }
              `}>
                Jour {reading.day}
              </span>
              {reading.completed 
                ? <CheckCircle2 size={20} className="text-bible-600 dark:text-bible-400" /> 
                : <Circle size={20} className="text-slate-300 group-hover:text-bible-400" />
              }
            </div>
            <h3 className={`font-serif font-semibold text-lg ${reading.completed ? 'text-bible-900 dark:text-bible-100' : 'text-slate-800 dark:text-slate-200'}`}>
              {reading.passage}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
               <Calendar size={12} />
               <span>{new Date(reading.date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}</span>
            </div>
            
            {/* Completion Effect */}
            {reading.completed && (
              <div className="absolute inset-0 bg-bible-400/5 pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingTracker;
