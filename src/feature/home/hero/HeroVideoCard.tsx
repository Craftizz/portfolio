import { Ref } from "react";
import styles from "./hero.module.css";

export default function HeroCard({
  sources,
  ref,
}: {
  sources: Array<{ src: string; type: string }>;
  ref?: Ref<HTMLDivElement>
}) {
  return (
    <div ref={ref} className={styles.hero__card}>
      <video className={styles.card__video} muted autoPlay loop playsInline>
        {sources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}