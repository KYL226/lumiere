import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  BarChart, Bar, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { booksCompletedData, themesData, streakData, memorizationProgressData, topicsExploredData } from '../data';

const COLORS = ['#c58650', '#d0a273', '#dec29d', '#eadbc3', '#9a5537', '#7f4733'];
const DARK_COLORS = ['#c58650', '#b96c41', '#9a5537', '#7f4733', '#663b2c', '#543224'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded shadow-lg text-sm">
        <p className="font-semibold text-slate-700 dark:text-slate-200">{label ? label : payload[0].name}</p>
        <p className="text-bible-600 dark:text-bible-400">
          {payload[0].value !== undefined ? `Valeur: ${payload[0].value}` : ''}
        </p>
      </div>
    );
  }
  return null;
};

const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      
      {/* 1. Books Distribution (Pie) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
        <h3 className="text-lg font-serif font-semibold text-slate-800 dark:text-slate-100 mb-4">Livres Complétés</h3>
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={booksCompletedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {booksCompletedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Reading Consistency (Line) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
        <h3 className="text-lg font-serif font-semibold text-slate-800 dark:text-slate-100 mb-4">Lecture (Pages/Jour)</h3>
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={streakData}>
              <defs>
                <linearGradient id="colorPages" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c58650" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#c58650" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="pages" stroke="#c58650" fillOpacity={1} fill="url(#colorPages)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Memorization Status (Donut) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
        <h3 className="text-lg font-serif font-semibold text-slate-800 dark:text-slate-100 mb-4">Progression Mémorisation</h3>
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={memorizationProgressData}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {memorizationProgressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Themes Distribution (Bar) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
        <h3 className="text-lg font-serif font-semibold text-slate-800 dark:text-slate-100 mb-4">Thèmes Étudiés</h3>
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={themesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" opacity={0.3} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={80} stroke="#94a3b8" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#d0a273" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Topics Radar (Radar) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
        <h3 className="text-lg font-serif font-semibold text-slate-800 dark:text-slate-100 mb-4">Sujets Explorés</h3>
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topicsExploredData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar name="Intérêt" dataKey="A" stroke="#c58650" fill="#c58650" fillOpacity={0.6} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6. Reading Pace (Simple Line) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
        <h3 className="text-lg font-serif font-semibold text-slate-800 dark:text-slate-100 mb-4">Vitesse de Lecture</h3>
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={streakData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="pages" stroke="#7f4733" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* 7. New vs Reviewed (Stacked Bar) - Simulated Data */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
         <h3 className="text-lg font-serif font-semibold text-slate-800 dark:text-slate-100 mb-4">Activité Hebdomadaire</h3>
         <div className="flex-1 min-h-[250px]">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={streakData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3}/>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="pages" name="Chapitres" stackId="a" fill="#c58650" />
                <Bar dataKey="pages" name="Versets" stackId="a" fill="#eadbc3" />
             </BarChart>
           </ResponsiveContainer>
         </div>
      </div>

      {/* 8. Completion by Testament (Pie) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
        <h3 className="text-lg font-serif font-semibold text-slate-800 dark:text-slate-100 mb-4">Testament</h3>
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[{name: 'Ancien', value: 39}, {name: 'Nouveau', value: 27}]}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#9a5537" />
                <Cell fill="#dec29d" />
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

       {/* 9. Goal Progress (Radial Bar - simulated with Pie) */}
       <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
        <h3 className="text-lg font-serif font-semibold text-slate-800 dark:text-slate-100 mb-4">Objectif Mensuel</h3>
        <div className="flex-1 min-h-[250px] flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[{value: 75}, {value: 25}]}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={85}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                <Cell fill="#c58650" />
                <Cell fill="#f1f5f9" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute text-center">
            <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">75%</span>
            <p className="text-xs text-slate-500">Complété</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StatsGrid;
