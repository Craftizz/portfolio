"use client";

import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import styles from "./header.module.css";

export default function Header() {

  const logoRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (logoRef.current && descriptionRef.current) {
      const splitDescription = new SplitType(descriptionRef.current, {
        types: "chars",
      });

      let timeline = gsap.timeline();

      timeline.from(logoRef.current, {
        autoAlpha: 0,
        yPercent: 100,
        duration: 1,
        ease: "power2",
      });

      timeline.from(splitDescription.chars, {
        backgroundColor: "var(--lightColor1)",
        opacity: 0,
        stagger: 0.05,
        duration: 0.1,
        ease: "steps(5)",
      }, ">");
    }
  });

  function handleWorkButton() {
    window.location.href = "/";
  }

  function handleGalleryButton() {
    window.location.href = "/gallery";
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__info}>
          <h1 ref={logoRef} className={styles.header__logo}>
            John Lexter Laguinday
          </h1>
          <p className={styles.header__description} ref={descriptionRef}>
            Cinematographer
          </p>
        </div>
        <nav className={styles.header__nav}>
          <button className={styles.button__transparent} onClick={handleWorkButton}>
            Works
          </button>
          <button className={styles.button__transparent} onClick={handleGalleryButton}>
            Gallery
          </button>
          <button className={styles.button__filled} onClick={handleWorkButton}>
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
