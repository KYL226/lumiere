import React, { useState } from 'react';
import { versesData } from '../data';
import { Verse } from '../types';
import { Brain, Star, Check, RefreshCw, ChevronRight } from 'lucide-react';

const Memorization: React.FC = () => {
  const [verses, setVerses] = useState<Verse[]>(versesData);
  const [selectedVerseId, setSelectedVerseId] = useState<string | null>(null);
  const [showText, setShowText] = useState(false);

  const selectedVerse = verses.find(v => v.id === selectedVerseId);

  const updateStatus = (id: string, status: Verse['status']) => {
    setVerses(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    setShowText(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">Mémorisation</h2>
            <p className="text-slate-600 dark:text-slate-400">Gravez la parole dans votre cœur.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List of Verses */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Vos Versets</h3>
          <div className="space-y-3">
             {verses.map(verse => (
               <button
                 key={verse.id}
                 onClick={() => { setSelectedVerseId(verse.id); setShowText(false); }}
                 className={`
                   w-full text-left p-4 rounded-xl border transition-all duration-200
                   ${selectedVerseId === verse.id 
                     ? 'bg-bible-600 text-white shadow-md border-bible-600' 
                     : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-bible-300'
                   }
                 `}
               >
                 <div className="flex justify-between items-center mb-1">
                   <span className="font-serif font-bold">{verse.reference}</span>
                   {verse.status === 'mastered' && <Star size={16} className="fill-current text-yellow-300" />}
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs opacity-80">{verse.topic}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase border ${
                      selectedVerseId === verse.id ? 'border-white/30 bg-white/10' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                    }`}>
                      {verse.status === 'new' ? 'Nouveau' : verse.status === 'learning' ? 'En cours' : 'Maîtrisé'}
                    </span>
                 </div>
               </button>
             ))}
          </div>
        </div>

        {/* Practice Area */}
        <div className="lg:col-span-2">
           {selectedVerse ? (
             <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-bible-300 to-bible-600" />
                
                <span className="inline-block px-4 py-1 rounded-full bg-bible-50 dark:bg-bible-900/30 text-bible-700 dark:text-bible-300 text-sm font-medium mb-8">
                  {selectedVerse.topic}
                </span>

                <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-8">
                  {selectedVerse.reference}
                </h3>

                <div 
                  className={`
                    mb-12 p-6 rounded-2xl max-w-lg w-full transition-all duration-500 cursor-pointer
                    ${showText ? 'bg-bible-50 dark:bg-slate-800 opacity-100 scale-100' : 'bg-slate-100 dark:bg-slate-800/50 opacity-100 blur-sm hover:blur-none'}
                  `}
                  onClick={() => setShowText(!showText)}
                >
                  <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
                    "{selectedVerse.text}"
                  </p>
                  {!showText && <p className="text-xs text-slate-400 mt-2">(Cliquez pour révéler)</p>}
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                   <button 
                     onClick={() => updateStatus(selectedVerse.id, 'learning')}
                     className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:border-bible-400 hover:text-bible-600 transition-colors"
                   >
                     <RefreshCw size={18} />
                     Réviser encore
                   </button>
                   <button 
                     onClick={() => updateStatus(selectedVerse.id, 'mastered')}
                     className="flex items-center gap-2 px-6 py-3 rounded-full bg-bible-600 text-white font-medium hover:bg-bible-700 shadow-lg shadow-bible-500/20 transition-all hover:scale-105"
                   >
                     <Check size={18} />
                     Je le connais !
                   </button>
                </div>

             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                <Brain size={48} className="mb-4 opacity-50" />
                <p>Sélectionnez un verset pour commencer la mémorisation.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Memorization;
