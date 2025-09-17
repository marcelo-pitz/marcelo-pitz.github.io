const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/marcelocoelhopitz/",
  },
  {
    label: "GitHub",
    href: "https://github.com/marcelo-pitz",
  },
];

import styles from "./styles.module.css";

export function LinksCard() {
  return (
    <div className={styles.card}>
      <div className={styles["section-title"]}>Links</div>
      <div className={styles.links}>
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles["links-a"]}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
