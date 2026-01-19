import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { generateCareerAdvice } from '../services/geminiService';
import { ChatMessage, LearnerDNA } from '../types';
import { INITIAL_CHAT_PROMPT } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface CareerCounselorProps {
  dna: LearnerDNA;
}

const CareerCounselor: React.FC<CareerCounselorProps> = ({ dna }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Namaste! Welcome to SkillSetter. I see you're interested in technology. How can I help you shape your career today?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    // Prepare context for AI
    const conversationHistory = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    conversationHistory.push({ role: 'user', parts: [{ text: input }] });

    const userContext = `
      Skills: ${dna.current_skills.map(s => s.name).join(', ')}.
      Aspirations: ${dna.aspirations.map(r => r.title).join(', ')}.
      Learning Style: ${dna.learning_styles.join(', ')}.
    `;

    const responseText = await generateCareerAdvice(conversationHistory, userContext);
    
    setIsThinking(false);
    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-500/20 p-2 rounded-lg">
            <Bot size={24} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">SkillSetter AI</h3>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Online • NSQF Aligned
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-slate-700' : 'bg-gradient-to-br from-cyan-500 to-teal-600'
            }`}>
              {msg.role === 'user' ? <User size={20} className="text-white" /> : <Sparkles size={20} className="text-white" />}
            </div>
            
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-slate-800 text-white rounded-tr-none' 
                : 'bg-slate-800/50 border border-slate-700 text-slate-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isThinking && (
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
               <Bot size={20} className="text-slate-500" />
             </div>
             <div className="flex items-center gap-1 h-10">
               <span className="w-2 h-2 bg-slate-600 rounded-full animate-bounce"></span>
               <span className="w-2 h-2 bg-slate-600 rounded-full animate-bounce delay-75"></span>
               <span className="w-2 h-2 bg-slate-600 rounded-full animate-bounce delay-150"></span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about careers, courses, or skills..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 pl-4 pr-12 text-white focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="absolute right-2 p-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 rounded-lg transition-colors text-white"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerCounselor;