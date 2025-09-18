import { useScene } from '../../../../context/SceneContext';
import styles from './NavigationMenu.module.css';

const sections = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'about', label: 'About', icon: '👨‍💻' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'contact', label: 'Contact', icon: '📧' },
] as const;

export function NavigationMenu() {
  const { state, dispatch } = useScene();

  const handleSectionChange = (sectionId: typeof sections[number]['id']) => {
    if (state.currentSection !== sectionId) {
      dispatch({ type: 'SET_TRANSITIONING', payload: true });
      setTimeout(() => {
        dispatch({ type: 'SET_CURRENT_SECTION', payload: sectionId });
        dispatch({ type: 'SET_TRANSITIONING', payload: false });
      }, 300);
    }
  };

  return (
    <nav className={styles.menu}>
      {sections.map((section) => (
        <button
          key={section.id}
          className={`${styles.menuItem} ${
            state.currentSection === section.id ? styles.active : ''
          }`}
          onClick={() => handleSectionChange(section.id)}
          disabled={state.isTransitioning}
        >
          <span className={styles.icon}>{section.icon}</span>
          <span className={styles.label}>{section.label}</span>
        </button>
      ))}
    </nav>
  );
}