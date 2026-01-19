// Domain Models

export enum LearningStyle {
  VISUAL = 'Visual',
  AUDITORY = 'Auditory',
  KINESTHETIC = 'Kinesthetic',
  READING = 'Reading/Writing'
}

export enum NSQFLevel {
  LEVEL_1 = 1,
  LEVEL_2 = 2,
  LEVEL_3 = 3,
  LEVEL_4 = 4,
  LEVEL_5 = 5,
  LEVEL_6 = 6,
  LEVEL_7 = 7,
  LEVEL_8 = 8,
  LEVEL_9 = 9,
  LEVEL_10 = 10
}

export interface Skill {
  id: string;
  name: string;
  proficiency: number; // 0-100
  nsqf_level?: NSQFLevel;
}

export interface JobRole {
  id: string;
  title: string;
  demand_score: number; // 0-100 derived from market signals
  salary_trend: 'up' | 'stable' | 'down';
  required_skills: string[]; // Skill IDs
}

export interface LearnerDNA {
  user_id: string;
  learning_styles: LearningStyle[];
  current_skills: Skill[];
  aspirations: JobRole[];
  constraints: {
    hours_per_week: number;
    device: 'mobile' | 'desktop';
    internet: 'low' | 'high';
  };
  behavioral_signals: {
    consistency: number;
    dropoff_risk: number;
  };
}

export interface PathNode {
  id: string;
  title: string;
  type: 'course' | 'assessment' | 'project' | 'internship';
  duration_hours: number;
  nsqf_alignment?: number;
  status: 'locked' | 'active' | 'completed';
  description: string;
}

export interface LearningPath {
  id: string;
  role_target: JobRole;
  nodes: PathNode[];
  progress: number;
  estimated_completion_date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}