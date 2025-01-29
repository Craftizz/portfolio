import { useEffect, useState } from "react";
import styles from "./grid-not-found.module.css";
import { Frame } from "@/types/frames";
import GalleryCard from "./card/Card";
import Footer from "@/components/layout/footer/Footer";
import { generateSeed } from "@/utils/random";
import { getNextFrames } from "@/lib/queries";
import { useError } from "@/context/ErrorContext";

export default function GalleryNoResult() {

    const [frames, setFrames] = useState<Frame[]>([]);
    const { error, setError } = useError();

    const seed = generateSeed();

    async function getFrames() {
        
        try {

            const result = await getNextFrames("", 1, 3, seed);

            if (!result) {

              setError("An error occurred with requesting the frames.");
              return;
            } 

            const { frames } = result;
            setFrames(frames);

          } catch (error) {
            
            setError("An error occurred with requesting the frames.");
          }
    }

    useEffect(() => {

        getFrames();

    }, []);

    return (
      <>
        <div className={styles.result}>
          <p className={styles.result__heading}>We found no frames from your query :(</p>
          <p className={styles.result__subheading}>
            You may check these frames instead
          </p>
          <div className={styles.result__alternative}>
          {frames.map((metadata, index) => (
            <GalleryCard key={index} frame={metadata}></GalleryCard>
          ))}
          </div>
        </div>
        <Footer />
      </>
    ); 
}