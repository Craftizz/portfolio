"use client";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from "react";
import { VideoBackground } from '@/lib/videoBackground';

import styles from "./hero.module.css";

export default function Hero() {

  const container = useRef<HTMLDivElement>(null);
  const videoReel = useRef<HTMLVideoElement>(null);
  const canvasReel = useRef<HTMLCanvasElement>(null);

  let videoBackground: VideoBackground;

  useEffect(() => {

    if (videoReel.current && canvasReel.current) {

        videoBackground = new VideoBackground(
          videoReel.current, 
          canvasReel.current
        );
    }

    return () => {
      videoBackground?.stopRendering();
    }

  }, []);

  useGSAP(() => {

    const cards = gsap.utils.toArray<HTMLElement>(`.${styles.hero__card}`);
    const scaleMax = gsap.utils.mapRange(1, cards.length - 1, 0.9, 1);

    if (videoReel.current && canvasReel.current) {

        let timeline = gsap.timeline();

        timeline.from(videoReel.current, {
          clipPath: "inset(100% 0 0 0)",
          duration: 2,
          ease: "power2",
          delay: 0.25,
        });

        timeline.from(canvasReel.current, {
          autoAlpha: 0,
          duration: 3,
          ease: "power2",
          onStart: () => {
            videoBackground.startRendering();
          },
        }, ">-1");
    }

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

    gsap.to(`.${styles.hero__cards}`, {
      scrollTrigger: {
          trigger: `.${styles.hero__cards}`,
          start: "30% 50%",
          scrub: true
        },
      y: -80
    });

  });

  return (
    <div ref={container} className={styles.hero}>
      <div className={styles.hero__cards}>
        <div className={styles.hero__card}>
          <video
            ref={videoReel}
            className={styles.card__video}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/Test-Reel.mp4" type="video/mp4" />
            <source src="/videos/Test-Reel.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <canvas
            ref={canvasReel}
            className={`${styles.hero__canvas}`}
            width="2"
            height="4"
            aria-hidden="true"
          ></canvas>
        </div>
        <div className={styles.hero__card}>
          <video
            className={styles.card__video}
            muted
            autoPlay
            loop
            playsInline
          >
            <source src="/videos/dilaw-mv-10s.mp4" type="video/mp4" />
            <source src="/videos/dilaw-mv-10s.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={styles.hero__card}>
          <video
            className={styles.card__video}
            muted
            autoPlay
            loop
            playsInline
          >
            <source src="/videos/ltp-ad-10s.mp4" type="video/mp4" />
            <source src="/videos/ltp-ad-10s.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={styles.hero__card}>
          <video
            className={styles.card__video}
            muted
            autoPlay
            loop
            playsInline
          >
            <source src="/videos/ulthera-ad-10s.mp4" type="video/mp4" />
            <source src="/videos/ulthera-ad-10s.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

function Card(sourceName: string) {
  return (
    <div>
      <div className={styles.hero__card}>
        <video
          className={styles.card__video}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
        >
          <source src={`/videos/${sourceName}.mp4`} type="video/mp4" />
          <source src={`/videos/${sourceName}.webm`} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
