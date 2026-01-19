import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CareerCounselor from './components/CareerCounselor';
import PathExplorer from './components/PathExplorer';
import Onboarding from './components/Onboarding';
import { LearnerDNA, NSQFLevel, PathNode } from './types';
import { MOCK_SKILLS, MOCK_ROLES } from './constants';

const App: React.FC = () => {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock State - In production this uses Zustand
  const [dna, setDna] = useState<LearnerDNA>({
    user_id: '123',
    learning_styles: [],
    current_skills: MOCK_SKILLS,
    aspirations: [MOCK_ROLES[0]],
    constraints: { hours_per_week: 10, device: 'desktop', internet: 'high' },
    behavioral_signals: { consistency: 0.9, dropoff_risk: 0.1 }
  });

  const [pathNodes, setPathNodes] = useState<PathNode[]>([
    { id: '1', title: 'Python Fundamentals for Data', type: 'course', duration_hours: 12, status: 'completed', description: 'Core syntax, variables, loops, and functions.' },
    { id: '2', title: 'SQL & Database Design', type: 'course', duration_hours: 18, status: 'active', description: 'Relational logic, normalization, and complex queries.' },
    { id: '3', title: 'ETL Pipeline Project', type: 'project', duration_hours: 24, status: 'locked', description: 'Build a real-time data ingestion pipeline.' },
    { id: '4', title: 'Cloud Data Warehousing', type: 'course', duration_hours: 10, status: 'locked', description: 'Introduction to Snowflake and BigQuery.' },
    { id: '5', title: 'Role Readiness Assessment', type: 'assessment', duration_hours: 2, status: 'locked', description: 'Final NSQF Level 6 Certification Exam.' },
  ]);

  const handleOnboardingComplete = (data: any) => {
    // Merge collected data into DNA
    setDna(prev => ({
      ...prev,
      learning_styles: data.styles,
      aspirations: MOCK_ROLES.filter(r => r.id === data.role)
    }));
    setHasOnboarded(true);
  };

  if (!hasOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && <Dashboard dna={dna} />}
      {activeTab === 'counselor' && <CareerCounselor dna={dna} />}
      {activeTab === 'path' && (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Your Learning Journey</h2>
          <PathExplorer nodes={pathNodes} />
        </div>
      )}
      {activeTab === 'market' && (
        <div className="flex items-center justify-center h-[50vh] text-slate-500">
          <div className="text-center">
             <h3 className="text-2xl font-bold text-white mb-2">Market Intelligence</h3>
             <p>Real-time labor graphs coming soon.</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;