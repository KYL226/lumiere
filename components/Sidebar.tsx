import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Brain, 
  PenTool, 
  BarChart2, 
  Settings, 
  HelpCircle,
  Menu,
  X,
  Scroll
} from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const menuItems: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: <LayoutDashboard size={20} /> },
    { id: 'reading', label: 'Lecture', icon: <BookOpen size={20} /> },
    { id: 'memorization', label: 'Mémorisation', icon: <Brain size={20} /> },
    { id: 'journal', label: 'Journal', icon: <PenTool size={20} /> },
    { id: 'stats', label: 'Statistiques', icon: <BarChart2 size={20} /> },
    { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={20} /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings size={20} /> },
  ];

  const handleNav = (view: View) => {
    setCurrentView(view);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full z-30 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-bible-500 text-white p-2 rounded-lg">
              <Scroll size={24} />
            </div>
            <span className="font-serif font-bold text-xl text-slate-800 dark:text-bible-100">Lumière</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${currentView === item.id 
                  ? 'bg-bible-50 text-bible-700 dark:bg-bible-900/30 dark:text-bible-300 font-medium shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-1/4 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-gradient-to-br from-bible-500 to-bible-600 rounded-xl p-2 text-white">
            <p className="text-xs font-medium opacity-80 mb-1">Verset du jour</p>
            <p className="text-sm italic">"Ta parole est une lampe à mes pieds..."</p>
            <p className="text-xs text-right mt-2 opacity-80">- Psaumes 119:105</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
