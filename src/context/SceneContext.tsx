import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { SceneState } from '../types';

interface SceneContextType {
  state: SceneState;
  dispatch: React.Dispatch<SceneAction>;
}

interface SceneAction {
  type: 
    | 'SET_CURRENT_SECTION'
    | 'SET_TRANSITIONING'
    | 'UNLOCK_ACHIEVEMENT'
    | 'INCREMENT_INTERACTION'
    | 'RESET_STATE';
  payload?: any;
}

const initialState: SceneState = {
  currentSection: 'home',
  isTransitioning: false,
  achievements: [
    {
      id: 'first-interaction',
      title: 'First Steps',
      description: 'Click on your first 3D object',
      unlocked: false,
      icon: '🎯',
      requirement: { type: 'interaction', value: 1 }
    },
    {
      id: 'explorer',
      title: 'Explorer',
      description: 'Visit all sections of the portfolio',
      unlocked: false,
      icon: '🗺️',
      requirement: { type: 'navigation', value: 5 }
    },
    {
      id: 'curious',
      title: 'Curious Mind',
      description: 'Interact with 10 different objects',
      unlocked: false,
      icon: '🔍',
      requirement: { type: 'interaction', value: 10 }
    },
    {
      id: 'dedicated',
      title: 'Dedicated Visitor',
      description: 'Spend 2 minutes exploring',
      unlocked: false,
      icon: '⏰',
      requirement: { type: 'time', value: 120 }
    }
  ],
  interactionCount: 0
};

function sceneReducer(state: SceneState, action: SceneAction): SceneState {
  switch (action.type) {
    case 'SET_CURRENT_SECTION':
      return {
        ...state,
        currentSection: action.payload
      };
    
    case 'SET_TRANSITIONING':
      return {
        ...state,
        isTransitioning: action.payload
      };
    
    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map(achievement =>
          achievement.id === action.payload
            ? { ...achievement, unlocked: true }
            : achievement
        )
      };
    
    case 'INCREMENT_INTERACTION':
      const newCount = state.interactionCount + 1;
      let updatedAchievements = [...state.achievements];
      
      // Check if any achievements should be unlocked
      updatedAchievements = updatedAchievements.map(achievement => {
        if (!achievement.unlocked && 
            achievement.requirement.type === 'interaction' && 
            newCount >= achievement.requirement.value) {
          return { ...achievement, unlocked: true };
        }
        return achievement;
      });
      
      return {
        ...state,
        interactionCount: newCount,
        achievements: updatedAchievements
      };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function SceneProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sceneReducer, initialState);
  
  return (
    <SceneContext.Provider value={{ state, dispatch }}>
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);
  if (context === undefined) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
}