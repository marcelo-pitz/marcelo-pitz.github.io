import { Html, useProgress } from '@react-three/drei';
import styles from './LoadingScreen.module.css';

export function LoadingScreen() {
  const { progress } = useProgress();

  return (
    <Html center className={styles.container}>
      <div className={styles.loadingContent}>
        <div className={styles.loader}>
          <div className={styles.sphere}></div>
          <div className={styles.sphere}></div>
          <div className={styles.sphere}></div>
        </div>
        <h2 className={styles.title}>Loading 3D Experience</h2>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className={styles.percentage}>{Math.round(progress)}%</p>
      </div>
    </Html>
  );
}