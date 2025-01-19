import Image from "next/image";
import styles from "./card.module.css";
import { Frame } from "@/types/frames";
import CardCaption from "./CardCaption";

export default function GalleryCard({ frame }: { frame: Frame }) {

  return (
    <div className={styles.grid__card}>
      <a href={`/images/original/${frame.id}.jpg`} className={styles.card__link} target="_blank" rel="noopener noreferrer">
        <Image
          src={`/images/original/${frame.id}.jpg`}
          alt="A still from a film"
          width={1920}
          height={1080}
          className={styles.card__image}
          loading="lazy"
          placeholder="blur"
          blurDataURL={`data:image/jpeg;base64,${frame.base64}`}
        />
        <div className={styles.card__overlay}>Download</div>
      </a>
      <CardCaption metadata={frame}></CardCaption>
    </div>
  );
}
