import type { Achievement } from '../../../../types';
import styles from './AchievementNotification.module.css';

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  return (
    <div className={styles.notification} onClick={onClose}>
      <div className={styles.content}>
        <div className={styles.icon}>{achievement.icon}</div>
        <div className={styles.text}>
          <h4 className={styles.title}>Achievement Unlocked!</h4>
          <h5 className={styles.achievementTitle}>{achievement.title}</h5>
          <p className={styles.description}>{achievement.description}</p>
        </div>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progress}></div>
      </div>
    </div>
  );
}