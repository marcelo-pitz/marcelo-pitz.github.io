const SKILLS = [
  "ReactJS",
  "React Native",
  "NextJS",
  "NodeJs",
  "NestJS",
  "Typescript",
  "Angular",
  "Java",
  "Spring boot",
  "Web",
  "Mobile",
];

import styles from "./styles.module.css";

export function SkillsCard() {
  return (
    <div className={styles.card}>
      <div className={styles["section-title"]}>Habilidades</div>
      <div className={styles.skills}>
        {SKILLS.map((skill) => (
          <div className={styles.skill} key={skill}>
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}
