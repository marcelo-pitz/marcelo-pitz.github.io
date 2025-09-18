import { useState, useEffect } from 'react';
import { useScene } from '../../../context/SceneContext';
import { AchievementNotification } from './AchievementNotification';
import { NavigationMenu } from './NavigationMenu';
import { ProgressIndicator } from './ProgressIndicator';
import styles from './styles.module.css';

export function UIOverlay() {
  const { state } = useScene();
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const [visitStartTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);
  const [lastUnlockedCount, setLastUnlockedCount] = useState(0);

  // Track time spent on site for time-based achievements
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - visitStartTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [visitStartTime]);

  // Show achievement notifications - Fixed to prevent infinite loop
  useEffect(() => {
    const unlockedAchievements = state.achievements.filter(a => a.unlocked);
    const unlockedCount = unlockedAchievements.length;
    
    // Only show notification if a NEW achievement was unlocked
    if (unlockedCount > lastUnlockedCount) {
      const latestAchievement = unlockedAchievements[unlockedCount - 1];
      setShowAchievement(latestAchievement.id);
      setLastUnlockedCount(unlockedCount);
      
      // Auto-hide after 4 seconds
      const timeout = setTimeout(() => setShowAchievement(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [state.achievements, lastUnlockedCount]); // Removed showAchievement dependency

  const currentAchievement = state.achievements.find(a => a.id === showAchievement);

  return (
    <div className={styles.overlay}>
      {/* Navigation Menu */}
      <NavigationMenu />
      
      {/* Progress Indicator */}
      <ProgressIndicator />
      
      {/* Achievement Notification */}
      {currentAchievement && (
        <AchievementNotification
          achievement={currentAchievement}
          onClose={() => setShowAchievement(null)}
        />
      )}
      
      {/* Stats Panel */}
      <div className={styles.statsPanel}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Interactions:</span>
          <span className={styles.statValue}>{state.interactionCount}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Time:</span>
          <span className={styles.statValue}>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Achievements:</span>
          <span className={styles.statValue}>
            {state.achievements.filter(a => a.unlocked).length}/{state.achievements.length}
          </span>
        </div>
      </div>
      
      {/* Instructions */}
      {state.currentSection === 'home' && state.interactionCount === 0 && (
        <div className={styles.instructions}>
          <h3>🎮 Welcome to the 3D Portfolio Experience!</h3>
          <p>• Click and drag to rotate the view</p>
          <p>• Scroll to zoom in/out</p>
          <p>• Click on colored portals to navigate</p>
          <p>• Interact with 3D objects to unlock achievements</p>
        </div>
      )}
    </div>
  );
}