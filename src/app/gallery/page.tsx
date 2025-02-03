import { ReactLenis } from "lenis/react";
import { Filters, getFilterValue } from "@/types/filters";
import Header from "@/components/layout/header/Header";
import ErrorAlert from "@/components/layout/error/ErrorAlert";
import FilterLayout from "@/feature/gallery/filter/FilterLayout";
import GalleryGrid from "@/feature/gallery/grid/Grid";
import styles from "./page.module.css";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  
  const filterParams = await searchParams;

  const filters: Filters = {
    query: getFilterValue(filterParams.query, "") as string,
    category: getFilterValue(filterParams.category, "") as string,
    location: getFilterValue(filterParams.location, "") as string,
    time: getFilterValue(filterParams.time, []) as string[],
    frame: getFilterValue(filterParams.frame, []) as string[],
  }

  return (
    <ReactLenis root>
      <Header />
      <ErrorAlert />
      <FilterLayout filters={filters}/>
      <div className={styles.gallery}>
        <GalleryGrid filters={filters} />
      </div>
      <div className={styles.overlay__gradient}></div>
    </ReactLenis>
  );
}
