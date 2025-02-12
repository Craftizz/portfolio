"use client";

import { 
  ReactNode, 
  createContext, 
  useContext, 
  useState } 
  from "react";


const LoadContext = createContext({
    isReady: false,
    setReady: (value: boolean) => {},
  });

export function LoadProvider({ children }: { children: ReactNode }) {

  const [isReady, setReady] = useState<boolean>(false);
  
  return (
    <LoadContext.Provider value={{ isReady, setReady }}>
      {children}
    </LoadContext.Provider>
  );
}

export function useLoad() {
  return useContext(LoadContext);
}
