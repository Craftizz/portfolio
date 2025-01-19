import { useEffect, useState } from "react";
import styles from "./gallery-no-result.module.css";
import { Frame } from "@/types/frames";
import GalleryCard from "../grid/card/Card";
import Footer from "@/components/layout/footer/Footer";


export default function GalleryNoResult({ seed }: { seed: number }) {

    const [frames, setFrames] = useState<Frame[]>([]);

    async function getFrames() {
        
        try {

            const res = await fetch(
              `/api/gallery?limit=3&seed=${seed}`
            );
      
            const { 
              result: queryResults, 
              total: total 
            } = await res.json();
      
            setFrames(queryResults);

          } catch (error) {
            alert("An error occured in requesting images.");
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