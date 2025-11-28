import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ReadingTracker from './components/ReadingTracker';
import Memorization from './components/Memorization';
import Journal from './components/Journal';
import QuizComponent from './components/Quiz';
import Settings from './components/Settings';
import { View } from './types';
import { Moon, Sun, Menu, Bell } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initial theme check
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  // Update HTML class for Tailwind dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'reading': return <ReadingTracker />;
      case 'memorization': return <Memorization />;
      case 'journal': return <Journal />;
      case 'quiz': return <QuizComponent />;
      case 'stats': return <Dashboard />; // Reuse dashboard for now, or could scroll to stats
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bible-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <main className="flex-1 overflow-y-auto relative h-full w-full">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-bible-50/90 dark:bg-slate-950/90 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold lg:hidden text-slate-800 dark:text-slate-100 font-serif">Lumière</h1>
          </div>

          <div className="flex items-center gap-3">
             <button 
               onClick={toggleTheme}
               className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
             >
               {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 relative">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
             </button>
             <div className="hidden sm:flex items-center gap-3 ml-2 pl-4 border-l border-slate-300 dark:border-slate-700">
               <div className="text-right">
                 <p className="text-sm font-bold text-slate-800 dark:text-slate-200">KABORE Ives Laurent</p>
                 <p className="text-xs text-slate-500">Catholique</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-bible-400 to-bible-600 flex items-center justify-center text-white font-bold font-serif">
                 K
               </div>
             </div>
          </div>
        </header>

        <div className="p-4 md:p-8 pb-20 max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
