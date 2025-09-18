import { useScene } from '../../../../context/SceneContext';
import styles from './ProgressIndicator.module.css';

export function ProgressIndicator() {
  const { state } = useScene();
  
  const unlockedCount = state.achievements.filter(a => a.unlocked).length;
  const totalCount = state.achievements.length;
  const progressPercentage = (unlockedCount / totalCount) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>🏆 Achievements</span>
        <span className={styles.counter}>{unlockedCount}/{totalCount}</span>
      </div>
      
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className={styles.achievementsList}>
        {state.achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`${styles.achievement} ${
              achievement.unlocked ? styles.unlocked : styles.locked
            }`}
          >
            <span className={styles.achievementIcon}>
              {achievement.unlocked ? achievement.icon : '🔒'}
            </span>
            <div className={styles.achievementInfo}>
              <span className={styles.achievementTitle}>
                {achievement.title}
              </span>
              <span className={styles.achievementDesc}>
                {achievement.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}