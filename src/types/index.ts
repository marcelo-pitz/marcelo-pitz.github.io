export interface SceneState {
  currentSection: 'home' | 'about' | 'skills' | 'projects' | 'contact';
  isTransitioning: boolean;
  achievements: Achievement[];
  interactionCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
  requirement: {
    type: 'interaction' | 'navigation' | 'time' | 'discovery';
    value: number;
  };
}

export interface NavigationPortal {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  targetSection: SceneState['currentSection'];
  color: string;
  isActive: boolean;
}

export interface InteractiveModel {
  id: string;
  type: 'skill' | 'project' | 'info';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  data: SkillData | ProjectData | InfoData;
  isHovered: boolean;
  isSelected: boolean;
}

export interface SkillData {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'languages';
  description: string;
  experience: string;
}

export interface ProjectData {
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  thumbnail: string;
}

export interface InfoData {
  title: string;
  content: string;
  type: 'personal' | 'professional' | 'educational';
}

export interface ParticleSystem {
  count: number;
  position: [number, number, number];
  velocity: [number, number, number];
  color: string;
  size: number;
  life: number;
}