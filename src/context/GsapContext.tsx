'use client'; 

import { createContext, ReactNode, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export const GsapContext = createContext<typeof gsap | null>(null);

export const GsapProvider = ({ children }: { children: ReactNode }) => {

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(useGSAP);

  return <GsapContext.Provider value={gsap}>{children}</GsapContext.Provider>;
};
