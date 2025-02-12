"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { useLoad } from "@/context/LoadContext";

import styles from "./preload.module.css";

export default function PreLoader() {
  const { isReady } = useLoad();

  const container = useRef<HTMLDivElement>(null);

  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      let timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

      timeline.to(`.${styles.loader__text}`, {
          duration: 2,
          text: "Getting there...",
          ease: "none",
          delay: 1,
        },
        1
      );

      timeline.to(`.${styles.loader__text}`, {
          duration: 1,
          text: "Loading...",
          ease: "power2",
          delay: 1,
        },
        ">"
      );

      timeline.to(`.${styles.loader__text}`, {
          yPercent: -100,
          duration: 0.5,
          ease: "power2",
        },
        1
      );

      timeline.set(`.${styles.loader__text}`, {
          yPercent: 100,
        },
        ">"
      );

      timeline.to(`.${styles.loader__text}`, {
          yPercent: 0,
          duration: 1,
          ease: "power2",
        },
        ">"
      );

      setTimeline(timeline);
    },
    { scope: container }
  );


  useGSAP(() => {
    if (isReady) {
        timeline?.kill();
        gsap.to(container.current, {
            yPercent: -100,
            duration: 1.5,
            ease: "power4.inOut"
        });
    }
  }, { scope: container, dependencies: [isReady] });

  return (
    <div ref={container} className={styles.loader}>
      <div className={styles.loader__pixel}>
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index}></div>
        ))}
      </div>
      <div className={styles.loader__content}>
        <div>
            <p className={styles.loader__text}>Loading...</p>
        </div>
      </div>
    </div>
  );
}
