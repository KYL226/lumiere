import React from 'react';
import { UserStats } from '../types';
import { userStats } from '../data';
import { Flame, Book, Trophy, Target, ArrowRight } from 'lucide-react';
import StatsGrid from './StatsGrid';

const StatCard: React.FC<{ 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  trend?: string;
  colorClass: string;
}> = ({ title, value, icon, trend, colorClass }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-start justify-between group hover:shadow-md transition-all">
    <div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{value}</h3>
      {trend && <p className="text-xs text-green-600 font-medium bg-green-50 dark:bg-green-900/20 inline-block px-2 py-1 rounded-md">{trend}</p>}
    </div>
    <div className={`p-3 rounded-xl ${colorClass} text-white opacity-90 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">
             Bienvenue, Disciple
           </h1>
           <p className="text-slate-600 dark:text-slate-400">
             "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier."
           </p>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Série Actuelle" 
          value={`${userStats.streak} Jours`} 
          icon={<Flame size={24} />} 
          trend="+2 depuis hier"
          colorClass="bg-orange-500"
        />
        <StatCard 
          title="Chapitres Lus" 
          value={userStats.totalChaptersRead} 
          icon={<Book size={24} />} 
          colorClass="bg-blue-500"
        />
        <StatCard 
          title="Versets Mémorisés" 
          value={userStats.versesMemorized} 
          icon={<Target size={24} />} 
          trend="Top 10%"
          colorClass="bg-purple-500"
        />
        <StatCard 
          title="Score Quiz Moyen" 
          value={`${userStats.quizScoreAverage}%`} 
          icon={<Trophy size={24} />} 
          colorClass="bg-yellow-500"
        />
      </div>

      {/* Featured Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
             <div className="bg-white/10 w-fit px-3 py-1 rounded-full text-xs font-semibold mb-4 backdrop-blur-sm">
               CONTINUER LA LECTURE
             </div>
             <h3 className="text-3xl font-serif font-bold mb-2">Évangile selon Jean</h3>
             <p className="text-slate-300 mb-6 max-w-md">Chapitre 4 : Jésus rencontre la femme samaritaine au puits de Jacob. Un enseignement sur l'eau vive.</p>
             <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
               Lire le Chapitre <ArrowRight size={18} />
             </button>
          </div>
        </div>

        <div className="bg-bible-100 dark:bg-bible-900/20 rounded-3xl p-8 border border-bible-200 dark:border-bible-900/50 flex flex-col justify-center items-center text-center">
           <h3 className="text-bible-900 dark:text-bible-100 font-serif font-bold text-xl mb-4">Verset à retenir</h3>
           <p className="text-lg italic text-slate-700 dark:text-slate-300 mb-4">
             "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne..."
           </p>
           <p className="text-sm font-bold text-bible-700 dark:text-bible-400 mb-6">- Jean 14:27</p>
           <button className="text-bible-800 dark:text-bible-200 font-semibold hover:underline">
             Voir mes cartes
           </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-6">Aperçu Statistique</h2>
        <StatsGrid />
      </div>

    </div>
  );
};

export default Dashboard;
