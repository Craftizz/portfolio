import { getRandomTags } from "@/service/ServerQueryService";
import FilterTags from "./FilterTags";


export default async function FilterTagsContainer() {

    const tags: string[] = await getRandomTags(5);

    return <FilterTags tags={tags} />
}