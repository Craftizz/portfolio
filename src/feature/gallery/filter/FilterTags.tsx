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
  const { setError } = useError();

  if (!tags || tags.length === 0) { 
  
      setError("Failed to gather search suggestions");
  
      return <FilterTagsSkeleton />;
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