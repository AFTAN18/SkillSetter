import { JobRole, NSQFLevel, Skill } from './types';

export const THEME_COLORS = {
  electricBlue: '#00FFFF',
  teal: '#14b8a6',
  orange: '#f97316',
  lime: '#84cc16',
  slate: '#0f172a',
};

export const MOCK_ROLES: JobRole[] = [
  { id: '1', title: 'AI Data Engineer', demand_score: 95, salary_trend: 'up', required_skills: ['python', 'sql', 'etl'] },
  { id: '2', title: 'Sustainable Energy Tech', demand_score: 88, salary_trend: 'up', required_skills: ['electrical', 'solar', 'maintenance'] },
  { id: '3', title: 'Full Stack Developer', demand_score: 92, salary_trend: 'stable', required_skills: ['react', 'node', 'db'] },
  { id: '4', title: 'Agri-Tech Specialist', demand_score: 85, salary_trend: 'up', required_skills: ['iot', 'farming', 'data'] },
];

export const MOCK_SKILLS: Skill[] = [
  { id: 'python', name: 'Python Programming', proficiency: 0, nsqf_level: NSQFLevel.LEVEL_5 },
  { id: 'sql', name: 'Database Management', proficiency: 0, nsqf_level: NSQFLevel.LEVEL_4 },
  { id: 'react', name: 'React.js', proficiency: 0, nsqf_level: NSQFLevel.LEVEL_5 },
  { id: 'comm', name: 'Business Communication', proficiency: 0, nsqf_level: NSQFLevel.LEVEL_3 },
];

export const INITIAL_CHAT_PROMPT = `
You are the "SkillSetter AI", an empathetic Career Counselor for the Indian National Learning Platform. 
Your goal is to guide learners to NSQF-aligned careers.
Keep responses concise, encouraging, and culturally relevant to India.
Ask 1 question at a time to uncover their Learner DNA.
`;