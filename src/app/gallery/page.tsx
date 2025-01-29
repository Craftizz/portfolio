import Header from "@/components/layout/header/Header";
import styles from "./page.module.css";

import { ReactLenis } from "lenis/react";
import GallerySearch from "@/components/gallery/search/SearchLayout";
import GalleryGrid from "@/feature/gallery/grid/Grid";
import ErrorAlert from "@/components/layout/error/ErrorAlert";
import FilterLayout from "@/feature/gallery/filter/FilterLayout";

export default async function Page(props: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return (
    <ReactLenis root>
      <Header />
      <ErrorAlert />
      <FilterLayout />
      {/* <GallerySearch /> */}
      <div className={styles.gallery}>
        <GalleryGrid searchQuery={query} />
      </div>
      <div className={styles.overlay__gradient}></div>
    </ReactLenis>
  );
}
