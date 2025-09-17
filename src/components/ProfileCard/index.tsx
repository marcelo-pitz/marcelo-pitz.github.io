const PROFILE = {
  name: "Marcelo Coelho Pitz",
  avatar: "https://avatars.githubusercontent.com/u/39320892?v=4",
  headline:
    "Desenvolvedor Fullstack | NextJS | ReactJS | NodeJs | NestJS | Java | Spring boot",
  location: "Pato Branco, Paraná, Brasil",
};

import styles from "./styles.module.css";

export function ProfileCard() {
  return (
    <div className={styles["profile-card"]}>
      <div className={styles["profile-img"]}>
        <img src={PROFILE.avatar} alt={`Foto de perfil ${PROFILE.name}`} />
      </div>
      <div>
        <h1 className={styles["h1"]}>{PROFILE.name}</h1>
        <div className={styles["headline"]}>{PROFILE.headline}</div>
        <div className={styles["location"]}>{PROFILE.location}</div>
      </div>
    </div>
  );
}
