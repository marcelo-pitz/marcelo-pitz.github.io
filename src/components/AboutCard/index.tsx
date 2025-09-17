import styles from "./styles.module.css";

export function AboutCard() {
  return (
    <div className={styles.card}>
      <div className={styles["section-title"]}>Sobre mim</div>
      <div className={styles.summary}>
        Olá, meu nome é Marcelo e sou um desenvolvedor fullstack. Minha paixão
        pela tecnologia me levou a me especializar em desenvolvimento fullstack,
        com foco em React/React Native e Typescript. Tenho habilidades também em
        NodeJs, Angular, Spring boot e outras tecnologias relevantes para o
        desenvolvimento de aplicações web e mobile.
      </div>
    </div>
  );
}
