import SearchSuggestion from "./Suggestion";
import { getSuggestions } from "@/lib/queries";

export default async function SearchSuggestionProvider() {

    const result = await getSuggestions();
    const { tags } = result;

    if (!tags) {

        return (<p>An error as occured.</p>)
    }

    return <SearchSuggestion tags={tags} />;
}
  