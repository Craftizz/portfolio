'use client';

export async function getNextFrames(
    query: string | string[] = "",
    category: string | string[] = "",
    page: number = 1,
    limit: number = 12,
    seed: number = 0
  ) {
    try {

      const response = await fetch(
        `/api/gallery?query=${query}&category=${category}&page=${page}&limit=${limit}&seed=${seed}`
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
  