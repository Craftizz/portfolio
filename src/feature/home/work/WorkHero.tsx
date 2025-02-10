"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import SplitType from "split-type";

import styles from "./work.module.css";

export default function WorkHero() {

  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    const heading = SplitType.create(`.${styles.work__heading}`);
    const subheading = SplitType.create(`.${styles.work__subheading}`);

    gsap.from(heading.words, {
        yPercent: 100,
        duration: 1,
        stagger: 0.05,
        ease: "power2",
        scrollTrigger: {
          trigger: `.${styles.work__heading}`,
          start: "top bottom",
          toggleActions: "play complete play reset",
        },
    });

    gsap.from(subheading.chars, {
        backgroundColor: 'var(--lightColor1)',
        opacity: 0,
        stagger: 0.05,
        duration: 0.1, 
        ease: 'steps(5)',
        scrollTrigger: {
            trigger: `.${styles.work__heading}`,
            start: "top bottom",
            toggleActions: "play complete play reset",
        },
    });

  }, { scope: container });

  return (
    <div ref={container} className={styles.work__hero}>
      <p className={styles.work__heading}>Index of Works</p>
      <p className={styles.work__subheading}>Scroll down to see works</p>
    </div>
  );
}
