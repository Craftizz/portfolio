import { getRandomTags } from "@/service/ServerQueryService";
import { Filters } from "@/types/filters";
import FilterTags from "./FilterTags";


export default async function FilterTagsContainer({ 
    filters,
} : { 
    filters: Filters
}) {

    const tags: string[] = await getRandomTags(filters);

    return <FilterTags tags={tags} />
}