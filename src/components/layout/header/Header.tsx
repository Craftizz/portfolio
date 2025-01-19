'use client';

import { useRef } from 'react';
import SplitType from 'split-type';

import styles from "./header.module.css";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Header() {

  const logoRef = useRef(null);
  const descriptionRef = useRef(null);

  useGSAP(
    () => {

      let timeline = gsap.timeline();

      if (logoRef) {

        timeline.from(logoRef.current, {
          y: 120,
          duration: 1, 
          ease: 'power2',
        });
      }


      if (descriptionRef.current) {

        const description = new SplitType(descriptionRef.current, { types: 'chars'})

        timeline.from(description.chars, {
          backgroundColor: 'var(--lightColor1)',
          opacity: 0,
          stagger: 0.05,
          duration: 0.1, 
          ease: 'steps(5)',
        }, ">");
      }
    }
  )

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
          <h1 className={styles.header__logo} ref={logoRef}>John Lexter Laguinday</h1>
          <p className={styles.header__description} ref={descriptionRef}>Cinematographer</p>
        </div>
        <nav className={styles.header__nav}>
          <button className={styles.nav__button} onClick={handleWorkButton}>Works</button>
          <button className={styles.nav__button }  onClick={handleGalleryButton}>Gallery</button>
          <button className={styles.nav__button} onClick={handleWorkButton}>Contact</button>
        </nav>
      </div>
    </header>
  );
}
