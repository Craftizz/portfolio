import styles from "./gallery-info.module.css";

export default function GalleryInfo({ current, total }: { current: number; total: number }) {
    return (
      <div className={styles.gallery__info}>
        {current === 0 ? (
          <div className={styles.info__skeleton}></div>
        ) : (
          <p className={styles.gallery__index}>
            Showing {Math.min(current, total)} out of {total} frames.
          </p>
        )}
      </div>
    );
}