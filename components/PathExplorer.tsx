import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, Play, BookOpen } from 'lucide-react';
import { PathNode } from '../types';

interface PathExplorerProps {
  nodes: PathNode[];
}

const PathExplorer: React.FC<PathExplorerProps> = ({ nodes }) => {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-800 z-0"></div>
      <div className="space-y-8 relative z-10">
        {nodes.map((node, index) => {
          const isLocked = node.status === 'locked';
          const isCompleted = node.status === 'completed';
          const isActive = node.status === 'active';

          return (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 group"
            >
              {/* Status Icon */}
              <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center bg-slate-950 shrink-0 transition-all duration-300 ${
                isCompleted ? 'border-lime-500 text-lime-500 shadow-[0_0_20px_rgba(132,204,22,0.3)]' :
                isActive ? 'border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-110' :
                'border-slate-700 text-slate-700'
              }`}>
                {isCompleted ? <CheckCircle size={24} /> : 
                 isActive ? <Play size={24} className="fill-current" /> : 
                 <Lock size={24} />}
              </div>

              {/* Card */}
              <div className={`flex-1 p-6 rounded-2xl border transition-all duration-300 ${
                isActive ? 'bg-slate-900 border-cyan-500/50 shadow-lg' : 
                isLocked ? 'bg-slate-900/50 border-slate-800 opacity-70' :
                'bg-slate-900 border-lime-500/30'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                    node.type === 'course' ? 'bg-blue-900/50 text-blue-400' :
                    node.type === 'project' ? 'bg-orange-900/50 text-orange-400' :
                    'bg-purple-900/50 text-purple-400'
                  }`}>
                    {node.type}
                  </span>
                  <span className="text-slate-500 text-xs">{node.duration_hours} Hours</span>
                </div>
                
                <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-slate-500' : 'text-white'}`}>
                  {node.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {node.description}
                </p>

                {!isLocked && (
                  <button className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    isActive ? 'bg-cyan-600 hover:bg-cyan-500 text-white' :
                    'bg-slate-800 text-lime-400'
                  }`}>
                    {isActive ? 'Start Learning' : 'Review Module'}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PathExplorer;