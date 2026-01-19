import React from 'react';
import { Menu, User, Briefcase, Activity, LogOut, TrendingUp } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <TrendingUp size={18} className="text-white" strokeWidth={3} />
            </div>
            <span className="font-bold text-xl tracking-tight hidden lg:block text-white">SkillSetter</span>
          </div>
          
          <nav className="mt-8 px-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'path', label: 'My Path', icon: Menu },
              { id: 'counselor', label: 'AI Counselor', icon: User },
              { id: 'market', label: 'Market Intel', icon: Briefcase },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-slate-800 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-slate-700' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <item.icon size={20} />
                <span className="hidden lg:block font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4">
          <button className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-red-400 transition-colors w-full">
            <LogOut size={20} />
            <span className="hidden lg:block font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-50 flex justify-around p-4">
         {[
              { id: 'dashboard', icon: Activity },
              { id: 'path', icon: Menu },
              { id: 'counselor', icon: User },
              { id: 'market', icon: Briefcase },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`${activeTab === item.id ? 'text-cyan-400' : 'text-slate-500'}`}
              >
                <item.icon size={24} />
              </button>
            ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24 md:pb-8 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;