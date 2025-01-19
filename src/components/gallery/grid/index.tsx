'use client';

import { useEffect, useRef, useState } from "react";
import { Frame } from "@/types/frames";
import { getNextFrames } from "@/lib/queries";
import { generateSeed } from "@/utils/random";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "@/components/layout/footer/Footer";
import GalleryCard from "./card/Card";
import styles from "./index.module.css";
import GalleryInfo from "./info/GalleryInfo";
import GallerySkeleton from "./GallerySkeleton";

const seed = generateSeed();
const limit = 12;

export default function GalleryGrid({
  searchQuery,
}: {
  searchQuery: string
}) {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const totalFrames = useRef(0);

  async function getFrames(isFirstQuery : boolean) {

    const currentPage = isFirstQuery ? 1 : page;

    try {

      const result = await getNextFrames(
        searchQuery, 
        currentPage, 
        limit, 
        seed);

      if (!result) {

        alert("An error occurred with requesting the frames.");
        return;
      } 

      const { frames, total } = result;

      setFrames((prev) => [...prev, ...frames]);
      setPage((prev) => prev + 1);
      setHasMore(page * limit < total);
      totalFrames.current = total;
      
    } catch (error) {

      alert("An error occurred with requesting the frames.");
    }
  }

  useEffect(() => {

    setFrames([]);
    setPage(1);
    setHasMore(true);
    getFrames(true);

  }, [searchQuery])

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

