import styles from "./grid-skeleton.module.css";

export default function GallerySkeleton() {
    return (
      <div className={styles.skeleton__grid}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className={styles.skeleton__card}>
            <div className={styles.skeleton__image}></div>
            <div className={styles.skeleton__caption}>
              <div className={styles.skeleton__project}></div>
              <div className={styles.skeleton__category}></div>
            </div>
          </div>
        ))}
      </div>
    );
}