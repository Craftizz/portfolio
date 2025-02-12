"use client";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { RefObject, useRef } from "react";
import { heroCardSources } from "@/data/HeroSources";
import { videoCardSources } from '@/data/HeroSources';
import HeroCard from './HeroReelCard';
import HeroVideoCard from './HeroVideoCard';

import styles from "./hero.module.css";

export default function Hero() {

  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Map<String, HTMLDivElement | null>>(null);

  function getMap() {
    if (!cardsRef.current) {

      cardsRef.current = new Map();
    }

    return cardsRef.current;
  }

  animateCards(container, getMap());

  return (
    <div className={styles.hero}>
      <div ref={container} className={styles.hero__cards}>
        <HeroCard
          sources={heroCardSources.sources}
          ref={(node) => {
            const map = getMap();
            map.set(heroCardSources.project, node);

            return () => {
              map.delete(heroCardSources.project);
            };
          }}
        />
        {videoCardSources.map((data, index) => (
          <HeroVideoCard
            key={index}
            sources={data.sources}
            ref={(node) => {
              const map = getMap();
              map.set(data.project, node);

              return () => {
                map.delete(data.project);
              };
            }}
          />
        ))}
      </div>
    </div>
  );
}

function animateCards(
  container: RefObject<HTMLDivElement | null>,
  getMap: Map<String, HTMLDivElement | null>
) {
  useGSAP(() => {

    const cards = Array.from(getMap.values());
    const scaleMax = gsap.utils.mapRange(1, cards.length - 1, 0.9, 1);

    gsap.set(cards, {
      y: (index) => 30 * index,
      transformOrigin: "center top",
    });

    cards.forEach((card, index) => {
      gsap.to(card, {
          scrollTrigger: {
              trigger: card,
              start: 'bottom bottom-=100',
              end: '+=1000',
              scrub: 2,
          },
          scale: () => scaleMax(index),
          filter: "blur(3px)",
      });

      if (index != 0) {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top top+=600',
                end: 'center center',
                scrub: true,
            },
            filter: "grayscale(100%)"
        });
      }
    });

    gsap.to(container.current, {
      scrollTrigger: {
          trigger: container.current,
          start: "30% 50%",
          scrub: true
        },
      y: -80
    });

  }, { scope: container });
}