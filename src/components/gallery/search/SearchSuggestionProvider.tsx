import styles from "./search-suggestion.module.css";

export default async function SearchSuggestionProvider() {

    const tags = await fetchTags();

    return (
      <div className={styles.suggestion__tags}>
        {tags &&
          tags.map((tag, index) => (
            <button
              key={index}
              type="button"
              className={styles.tags}
              onClick={() => {}}
            >
              {tag}
            </button>
          ))}
      </div>
    );
}

async function fetchTags() {

    const data = await fetch(`/api/search?`);
    const { tags: tags }: { tags: string[] } = await data.json();

    return tags;
}