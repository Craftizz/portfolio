"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { VideoBackground } from "@/lib/videoBackground";
import { Project } from "@/types/project";
import WorkCard from "./WorkCard";
import WorkHero from "./WorkHero";

import styles from "./work.module.css";


export default function WorkLayout({
  projects
}: {
  projects: Project[];
}) {

  const container = useRef<HTMLDivElement>(null);
  const canvasReel = useRef<HTMLCanvasElement>(null);
  const cardContainer = useRef<HTMLDivElement>(null);
  const initialVideo = useRef<HTMLVideoElement>(null);

  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);
  const [background, setBackground] = useState<VideoBackground>();

  useEffect(() => {
    if (initialVideo.current && canvasReel.current) {
      setBackground(
        new VideoBackground(initialVideo.current, canvasReel.current)
      );
    }

    return () => {
      background?.stopRendering();
    };
  }, []);

  useGSAP(
    () => {

      const pixels = gsap.utils.toArray(`.${styles.gallery__pixel} div`);

      gsap.set(pixels, { yPercent: 0 });
      gsap.to(pixels, {
        yPercent: -100,
        ease: "none",
        stagger: 0.2,
        scrollTrigger: {
          trigger: `.${styles.work__heading}`,
          start: "top top",
          endTrigger: `.${styles.gallery__cards}`,
          end: "top center",
          scrub: 2,
        },
      });

      const galleryCards: HTMLDivElement[] = gsap.utils.toArray(`.${styles.gallery__card}`);

      function getCardWidth() {
        return galleryCards.length
          ? galleryCards[0].offsetWidth
          : 0;
      }

      function getTotalWidth() {
        return getCardWidth() * galleryCards.length;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.work__gallery}`,
          start: "top top",
          end: () => "+=" + getTotalWidth(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        },
      });

      timeline.to(galleryCards, {
        x: () => { return -getTotalWidth() + getCardWidth(); },
        ease: "none",
      });

      setTimeline(timeline);
    },

    { scope: container }
  );

  function updateVideo(video: HTMLVideoElement) {
    if (background) {
      background.updateVideoSource(video);
    }
  }

  return (
    <div ref={container} className={styles.work}>
      <WorkHero />
      <div className={styles.work__gallery}>
        <div className={styles.gallery__background}>
          <div className={styles.gallery__pixel}>
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index}></div>
            ))}
          </div>
          <canvas
            ref={canvasReel}
            className={styles.gallery__canvas}
            width={1280}
            height={720}
            aria-hidden="true"
          />
        </div>
        <div className={styles.gallery__content}>
          <div ref={cardContainer} className={styles.gallery__cards}>
            {projects.map((project, index) => (
              <WorkCard
                ref={(ref) => {
                  if (index === 0 && ref) {
                    initialVideo.current = ref;
                  }
                }}
                key={project.source}
                sourceName={project.source}
                timeline={timeline}
                updateVideo={updateVideo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
