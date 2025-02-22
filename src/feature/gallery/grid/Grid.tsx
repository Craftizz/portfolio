'use client';

import { useEffect, useRef, useState } from "react";
import { Frame } from "@/types/frames";
import { getNextFrames } from "@/service/ClientQueryService";
import { generateSeed } from "@/utils/random";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "@/components/layout/footer/Footer";
import GalleryCard from "./card/Card";
import styles from "./grid.module.css";
import GalleryInfo from "./info/GalleryInfo";
import GallerySkeleton from "./GridSkeleton";
import GalleryNoResult from "./GridNotFound";
import GridSkeleton from "./GridSkeleton";
import { useError } from "@/context/ErrorContext";
import { Filters } from "@/types/filters";

const seed = generateSeed();
const limit = 6;

export default function GalleryGrid({ 
  filters 
}: {
  filters: Filters
}) {
  
  const [frames, setFrames] = useState<Frame[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { error, setError } = useError();
  
  const totalFrames = useRef(0);

  async function getFrames(isFirstQuery : boolean) {

    const currentPage = isFirstQuery ? 1 : page;

    try {

      const result = await getNextFrames(filters, currentPage, limit, seed);

      if (!result) {

        setError("An error occurred with requesting the frames.");
        return;
      } 

      const { frames, total } = result;

      setFrames((prev) => [...prev, ...frames]);
      setPage((prev) => prev + 1);
      setHasMore(page * limit < total);
      totalFrames.current = total;
      
    } catch (error) {

      setError("An error occurred with requesting the frames.");
    }
  }

  useEffect(() => {

    setFrames([]);
    setPage(1);
    setHasMore(true);
    getFrames(true);

  }, [filters])

  if (frames.length === 0 && !hasMore) {
    return <GalleryNoResult />;
  }

  if (error) {
    return <GridSkeleton />;
  }

  return (
    <> 
      <GalleryInfo current={frames.length} total={totalFrames.current} />
      <div className={styles.gallery__grid}>
        <InfiniteScroll
          dataLength={frames.length}
          next={() => getFrames(false)}
          hasMore={hasMore}
          loader={<GallerySkeleton />}
          endMessage={<Footer />}
        >
          <div className={styles.grid__content}>
            {frames.map((frame, index) => (
              <GalleryCard key={index} frame={frame}></GalleryCard>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

