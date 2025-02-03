'use client';

import { useSearchParams } from "next/navigation";
import { useError } from "@/context/ErrorContext";
import useSearchHandler from "@/hooks/useSearchHandler";
import FilterTagsSkeleton from "./FilterTagsSkeleton";

import styles from "./filter-tags.module.css";

export default function FilterTags({ 
  tags 
}: { 
  tags: string[] 
}) {

  const searchParams = useSearchParams();
  const { handleSearch } = useSearchHandler();

    if (!tags || tags.length === 0) { 
  
      return null;
  }

  return (
    <div className={styles.tags}>
      {tags.map((tag, index) => (
        <button
          key={index}
          type="button"
          className={styles.tag}
          onClick={() => handleSearch(searchParams, { query: tag })}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}