import Image from "next/image";
import styles from "./card.module.css";
import { Frame } from "@/types/frames";
import CardCaption from "./CardCaption";
import CardButton from "./CardButton";

export default function GalleryCard({ 
  frame 
}: { 
  frame: Frame 
}) {

  return (
    <div className={styles.grid__card}>
      <div className={styles.card}>
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
      </div>
      <div className={styles.card__info}>
        <CardCaption metadata={frame}></CardCaption>
        <CardButton id={frame.id} ></CardButton>
      </div>
    </div>
  );
}
