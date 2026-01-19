import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';
import { JobRole, LearningStyle } from '../types';
import { MOCK_ROLES } from '../constants';

interface OnboardingProps {
  onComplete: (data: any) => void;
}

const STEPS = ['Aspirations', 'Current Skills', 'Learning Style', 'Constraints'];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<{
    role?: string;
    skills: string[];
    styles: LearningStyle[];
  }>({ skills: [], styles: [] });

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(selections);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
          <motion.div 
            className="h-full bg-cyan-400" 
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="mb-8 mt-4">
          <h2 className="text-sm font-medium text-cyan-400 mb-2">Step {step + 1} of {STEPS.length}</h2>
          <h1 className="text-3xl font-bold text-white">
            {step === 0 && "What is your dream career?"}
            {step === 1 && "What do you already know?"}
            {step === 2 && "How do you learn best?"}
            {step === 3 && "Any time constraints?"}
          </h1>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {step === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_ROLES.map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelections({...selections, role: role.id})}
                  className={`p-6 rounded-xl border text-left transition-all ${
                    selections.role === role.id 
                      ? 'bg-cyan-500/10 border-cyan-400 ring-1 ring-cyan-400' 
                      : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="font-bold text-white text-lg mb-2">{role.title}</div>
                  <div className="text-xs text-slate-400">Demand: {role.demand_score}%</div>
                  {selections.role === role.id && <Check className="absolute top-4 right-4 text-cyan-400" size={16} />}
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
             <div className="flex flex-wrap gap-3">
               {['Python', 'Communication', 'React', 'SQL', 'Project Mgmt', 'Sales', 'Electronics'].map(skill => (
                 <button
                   key={skill}
                   onClick={() => {
                     const has = selections.skills.includes(skill);
                     setSelections({
                       ...selections, 
                       skills: has ? selections.skills.filter(s => s !== skill) : [...selections.skills, skill]
                     })
                   }}
                   className={`px-6 py-3 rounded-full border text-sm font-medium transition-all ${
                     selections.skills.includes(skill)
                       ? 'bg-lime-500 text-slate-900 border-lime-500'
                       : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                   }`}
                 >
                   {skill}
                 </button>
               ))}
             </div>
          )}

          {step === 2 && (
             <div className="space-y-4">
                {Object.values(LearningStyle).map(style => (
                   <button
                   key={style}
                   onClick={() => setSelections({...selections, styles: [style]})}
                   className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
                     selections.styles.includes(style)
                       ? 'bg-orange-500/10 border-orange-500'
                       : 'bg-slate-800 border-slate-700'
                   }`}
                 >
                   <span className="text-white font-medium">{style}</span>
                   {selections.styles.includes(style) && <Check size={20} className="text-orange-500" />}
                 </button>
                ))}
             </div>
          )}
          
           {step === 3 && (
             <div className="text-center text-slate-400 py-10">
               <p>We'll optimize your schedule automatically.</p>
               <div className="mt-8 p-6 bg-slate-800 rounded-xl">
                 <span className="block text-2xl font-bold text-white mb-2">~10 Hours / Week</span>
                 <span className="text-sm">Recommended pace based on your goal</span>
               </div>
             </div>
          )}
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
          >
            {step === STEPS.length - 1 ? 'Build My DNA' : 'Next'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;