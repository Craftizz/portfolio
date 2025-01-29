import styles from "./filter-tags.module.css";

export default function FilterTagsSkeleton() {
    return (
        <div className={styles.tags}>
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className={styles.tag__skeleton}></div>
            ))}
        </div>
    );

}