import SearchSuggestion from "./Suggestion";
import { getSuggestions } from "@/lib/queries";

export default async function SearchSuggestionContainer() {

    const result = await getSuggestions();
    const { tags } = result;

    if (!tags || tags.length === 0) {

        return (<p>An error as occured.</p>)
    }

    return <SearchSuggestion tags={tags} />;
}
  