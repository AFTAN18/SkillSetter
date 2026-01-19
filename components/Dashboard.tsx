import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { LearnerDNA } from '../types';
import { motion } from 'framer-motion';

interface DashboardProps {
  dna: LearnerDNA;
}

const Dashboard: React.FC<DashboardProps> = ({ dna }) => {
  const skillData = dna.current_skills.map(s => ({
    subject: s.name,
    A: s.proficiency,
    fullMark: 100
  }));

  const progressData = [
    { name: 'Week 1', hours: 4 },
    { name: 'Week 2', hours: 6 },
    { name: 'Week 3', hours: 8 },
    { name: 'Week 4', hours: 5 },
    { name: 'Week 5', hours: 10 },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Learner</h1>
        <p className="text-slate-400">Your NSQF readiness score is <span className="text-cyan-400 font-bold">Level 4</span>. Goal: Level 6.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stat Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm"
        >
          <h3 className="text-slate-400 text-sm font-medium mb-1">Weekly Streak</h3>
          <div className="text-4xl font-bold text-white">12 Days</div>
          <div className="mt-2 text-xs text-lime-400 flex items-center gap-1">
            ▲ Top 10% of consistency
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm"
        >
          <h3 className="text-slate-400 text-sm font-medium mb-1">Hours Learned</h3>
          <div className="text-4xl font-bold text-white">34.5 hrs</div>
          <div className="mt-2 text-xs text-cyan-400">
            On track for weekly goal
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm"
        >
          <h3 className="text-slate-400 text-sm font-medium mb-1">Job Market Demand</h3>
          <div className="text-4xl font-bold text-orange-400">High</div>
          <div className="mt-2 text-xs text-slate-400">
            +15% jobs in your target role
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Gap Radar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-[400px] flex flex-col"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Skill Gap Analysis</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="#00FFFF"
                  fill="#00FFFF"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Learning Activity Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-[400px] flex flex-col"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Learning Velocity</h3>
          <div className="flex-1 w-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#14b8a6' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#14b8a6" fillOpacity={1} fill="url(#colorHours)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;