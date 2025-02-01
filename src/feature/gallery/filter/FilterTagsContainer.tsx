import { getRandomTags } from "@/service/ServerQueryService";
import FilterTags from "./FilterTags";


export default async function FilterTagsContainer({ 
    category,
    location,
    time,
    frame,
} : { 
    category: string
    location: string,
    time: string[],
    frame: string[],
}) {

    const tags: string[] = await getRandomTags(category, location, time, frame);

    return <FilterTags tags={tags} />
}