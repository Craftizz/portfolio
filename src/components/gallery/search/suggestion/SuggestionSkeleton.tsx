import styles from "./suggestion-skeleton.module.css";


export default function SuggestionSkeleton() {
    return (
      <>
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className={styles.skeleton__tag}></div>
        ))}
      </>
    );
}