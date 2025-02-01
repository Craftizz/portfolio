'use client';

export async function getNextFrames(
    query: string = "",
    category: string = "",
    location: string = "",
    time: string[] = [],
    frame: string[] = [],
    page: number = 1,
    limit: number = 12,
    seed: number = 0
  ) {
    try {

      const params = new URLSearchParams();

      if (query) {
          params.append("query", query)
      };

      if (category) {
          params.append("category", category)
      };
      if (location) {
          params.append("location", location)
      };

      time.forEach(t => params.append("time", t));
      frame.forEach(f => params.append("frame", f));

      params.append("page", page.toString());
      params.append("limit", limit.toString());
      params.append("seed", seed.toString());

      const url = `/api/gallery?${params.toString()}`;

      const response = await fetch(url);
  
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
  