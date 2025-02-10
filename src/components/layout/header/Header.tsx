"use client";

import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import styles from "./header.module.css";
import Button from "@/components/button";
import { time } from "console";

export default function Header({ 
  variant
} : {
  variant: 'bordered' | 'transparent';
}) {

  const container = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline>(null);

  useGSAP(() => {

    const logo = SplitType.create(`.${styles.header__logo}`);
    const description = SplitType.create(`.${styles.header__description}`);
    
    const timeline = gsap.timeline();
    timeline.current = timeline;

    timeline.from(logo.words, {
          autoAlpha: 0,
          yPercent: 100,
          duration: 1,
          stagger: 0.05,
          ease: "power2",
      })

    timeline.from(".header__button", {
          autoAlpha: 0,
          yPercent: 100,
          duration: 1,
          stagger: 0.1,
          ease: "power2",
          onComplete: () => {
            gsap.set('.header__button', { clearProps: 'transform' });
          }
        },"<")

    timeline.from(description.chars, {
          backgroundColor: "var(--lightColor1)",
          opacity: 0,
          stagger: 0.05,
          duration: 0.1,
          ease: "steps(5)",
        }, "<50%");
    
  }, { scope: container });

  return (
    <header
      ref={container}
      className={`${styles.header} ${
        variant === "transparent"
          ? styles.header__transparent
          : styles.header__bordered
      }`}
    >
      <div className={styles.header__content}>
        <div className={styles.header__info}>
          <h1 className={styles.header__logo}>
            John Lexter Laguinday
          </h1>
          <p className={styles.header__description}>
            Cinematographer
          </p>
        </div>
        <nav className={styles.header__nav}>
          <Button className="header__button" variant="transparent" to="/">
            Works
          </Button>
          <Button className="header__button" variant="transparent" to="/gallery">
            Gallery
          </Button>
          <Button className="header__button" variant="filled" to="/">
            Contact
          </Button>
        </nav>
      </div>
    </header>
  );
}
