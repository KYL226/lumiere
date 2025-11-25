import React, { useState } from 'react';
import { journalEntries } from '../data';
import { JournalEntry } from '../types';
import { Plus, Save, Tag, Search } from 'lucide-react';

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(journalEntries);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = () => {
    if (!newTitle || !newContent) return;
    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      title: newTitle,
      content: newContent,
      tags: ['Réflexion']
    };
    setEntries([newEntry, ...entries]);
    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
  };

  const filteredEntries = entries.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">Journal & Réflexions</h2>
            <p className="text-slate-600 dark:text-slate-400">Notez vos pensées et prières.</p>
         </div>
         <button 
           onClick={() => setIsCreating(!isCreating)}
           className="bg-bible-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-bible-700 transition-colors shadow-sm"
         >
           <Plus size={20} />
           <span>Nouvelle Entrée</span>
         </button>
      </div>

      {isCreating && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-bible-200 dark:border-bible-900/50 animate-in fade-in slide-in-from-top-4 duration-300">
           <input 
             type="text" 
             placeholder="Titre de votre réflexion..."
             className="w-full text-xl font-serif font-bold border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400"
             value={newTitle}
             onChange={(e) => setNewTitle(e.target.value)}
           />
           <textarea 
             placeholder="Écrivez ici..."
             className="w-full h-40 resize-none bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl outline-none text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-bible-200 dark:focus:ring-bible-800 transition-all"
             value={newContent}
             onChange={(e) => setNewContent(e.target.value)}
           />
           <div className="flex justify-end gap-3 mt-4">
             <button 
               onClick={() => setIsCreating(false)}
               className="px-4 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
             >
               Annuler
             </button>
             <button 
               onClick={handleSave}
               className="bg-bible-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-bible-700 transition-colors"
             >
               <Save size={18} />
               Enregistrer
             </button>
           </div>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Rechercher dans vos notes..." 
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-bible-400 transition-colors shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {filteredEntries.map(entry => (
           <div key={entry.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-bible-600 bg-bible-50 dark:bg-bible-900/30 px-2 py-1 rounded-md">
                  {new Date(entry.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-bible-700 transition-colors">
                {entry.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 text-sm leading-relaxed">
                {entry.content}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                 <Tag size={12} />
                 {entry.tags.join(', ')}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Journal;
