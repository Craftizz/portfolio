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

  const query = typeof filters.query === 'string' ? filters.query : "";
  const category = typeof filters.category === 'string' ? filters.category : "";
  const location = typeof filters.location === 'string' ? filters.location : "";
  const time = Array.isArray(filters.time) ? filters.time : filters.time ? [filters.time] : [""];
  const frame = Array.isArray(filters.frame) ? filters.frame : filters.frame ? [filters.frame] : [""];

  return (
    <ReactLenis root>
      <Header />
      <ErrorAlert />
      <FilterLayout category={category} location={location} time={time} frame={frame}/>
      <div className={styles.gallery}>
        <GalleryGrid query={query} category={category} location={location} time={time} frame={frame} />
      </div>
      <div className={styles.overlay__gradient}></div>
    </ReactLenis>
  );
}
