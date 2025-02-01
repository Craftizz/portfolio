import Header from "@/components/layout/header/Header";
import styles from "./page.module.css";

import { ReactLenis } from "lenis/react";
import GalleryGrid from "@/feature/gallery/grid/Grid";
import ErrorAlert from "@/components/layout/error/ErrorAlert";
import FilterLayout from "@/feature/gallery/filter/FilterLayout";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  
  const filters = await searchParams;
  const query = filters.query || "";

  const category = typeof filters.category === 'string' ? filters.category : "";
  const time = filters.time || "";
  const frame = filters.frame || "";

  return (
    <ReactLenis root>
      <Header />
      <ErrorAlert />
      <FilterLayout category={category} time={time} frame={frame}/>
      <div className={styles.gallery}>
        <GalleryGrid query={query} category={category} />
      </div>
      <div className={styles.overlay__gradient}></div>
    </ReactLenis>
  );
}
