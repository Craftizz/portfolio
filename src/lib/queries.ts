export async function getNextFrames(
  query: string,
  page: number,
  limit: number,
  seed: number
) {
  try {
    const response = await fetch(
      `/api/gallery?query=${query}&page=${page}&limit=${limit}&seed=${seed}`
    );

    if (!response.ok) {
      throw new Error(`Failed to request frames: ${response.statusText}`);
    }

    const { result: frames, total } = await response.json();
    return { frames, total };


  } catch (error) {
    
    console.error(`Failed to request frames: ${error}`);

    return { frames: [], total: 0 };
  }
}

export async function getSuggestions() {

  try {


    const response = await fetch(
      `http://localhost:3000/api/search`
    );

    if (!response.ok) {
      throw new Error(`Failed to gather search suggestions: ${response.statusText}`);
    }

    const tags = await response.json();
    return tags;

  } catch (error) {

    console.error(`Failed to gather search suggestions: ${error}`)

    return [];
  }
}
