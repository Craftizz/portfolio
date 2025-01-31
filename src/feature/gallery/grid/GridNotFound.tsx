import { useEffect, useState } from "react";
import { useError } from "@/context/ErrorContext";
import { getNextFrames } from "@/service/ClientQueryService";
import { Frame } from "@/types/frames";
import { generateSeed } from "@/utils/random";
import GalleryCard from "./card/Card";
import Footer from "@/components/layout/footer/Footer";

import styles from "./grid-not-found.module.css";

export default function GalleryNoResult() {

    const [frames, setFrames] = useState<Frame[]>([]);
    const { setError } = useError();

    const seed = generateSeed();

    async function getFrames() {
        
        try {

            const result = await getNextFrames("", "", 1, 3, seed);

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