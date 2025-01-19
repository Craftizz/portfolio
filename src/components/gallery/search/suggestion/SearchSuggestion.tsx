import { Suspense, useCallback, useEffect, useState } from "react";

import styles from "./search-suggestion.module.css";

type SearchComponentProps = {
    onSearch: (param: string, value: string) => void;
};

export default function SearchSuggestion({ onSearch }: SearchComponentProps) {

    const [tags, setTags] = useState<string[]>([]);

    const fetchTags = useCallback(async () => {

      try {
        const res = await fetch(`/api/search?`);

        const { tags: tagResults } = await res.json();

        setTags(tagResults);

      } catch (error) {
        alert("An error occured in requesting tags.");
      }
    }, []);
    
    useEffect(() => {

      fetchTags();

      return(() => {

        setTags([]);
      })

    }, [fetchTags]);

    return (
        <div className={styles.search__suggestion}>
            <p className={styles.suggestion__title}>Keywords:</p>
            <div className={styles.suggestion__tags}>
            {tags.map((tag, index) => (
                    <button
                      key={index}
                      type="button"
                      className={styles.tags}
                      onClick={() => onSearch("query", tag)}
                    >
                      {tag}
                    </button>
                  ))}
            </div>
        </div>
    )
}

