import { getRandomTags } from "@/service/ServerQueryService";
import FilterTags from "./FilterTags";


export default async function FilterTagsContainer({ 
    category 
} : { 
    category: string
}) {

    const tags: string[] = await getRandomTags(category);

    return <FilterTags tags={tags} />
}