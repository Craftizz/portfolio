import styles from "./work.module.css";

import gsap from "gsap";
import { Ref, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { time } from "console";

export default function WorkCard({
  sourceName,
  timeline,
  pinnedContainer,
  updateVideo,
  ref
}: {
  sourceName: string;
  timeline: gsap.core.Timeline | null
  pinnedContainer?: HTMLDivElement | null
  updateVideo: (video: HTMLVideoElement) => void
  ref: Ref<HTMLVideoElement>
}) {

    const container = useRef<HTMLDivElement>(null);
    const video = useRef<HTMLVideoElement>(null);

    const setVideoRef = (node: HTMLVideoElement | null) => {
      video.current = node;
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          if ('current' in ref) ref.current = node;
        }
      }
    };

  useGSAP(() => {
    if (timeline) {
        gsap.fromTo(container.current, 
          { filter: "brightness(0.40) grayscale(30%)" },
          { filter: "brightness(1) grayscale(0%)",
              scrollTrigger: {
                trigger: container.current,
                pinnedContainer: pinnedContainer,
                containerAnimation: timeline,
                start: "left center",
                end: "center center",
                scrub: true,
              },
          }
        );

        ScrollTrigger.create({
          trigger: container.current,
          containerAnimation: timeline,
          start: "left center",
          end: "right center",
          onToggle: (self) => {
            if (!self.isActive) {
              return;
            }

            if (video.current) {
              updateVideo(video.current);
            }
          },
        });
    }
  }, [timeline]);

  return (
    <div ref={container} className={styles.gallery__card}>
      <video
        ref={setVideoRef}
        className={styles.gallery__video}
        muted
        autoPlay
        loop
        playsInline
      >
        <source src={`/videos/${sourceName}.mp4`} type="video/mp4" />
        <source src={`/videos/${sourceName}.webm`} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
