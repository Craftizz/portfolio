import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Ref, RefObject, useEffect, useRef } from "react";
import { VideoBackground } from "@/lib/videoBackground";
import { useLoad } from "@/context/LoadContext";


import styles from "./hero.module.css";

export default function HeroCard({
  sources,
  ref 
}:{
  sources: Array<{ src: string; type: string }>;
  ref?: Ref<HTMLDivElement>
}) {
  const { isReady, setReady } = useLoad();

  const videoReel = useRef<HTMLVideoElement>(null);
  const canvasReel = useRef<HTMLCanvasElement>(null);
  const videoBackground = useRef<VideoBackground>(null);

  createVideoBackground(videoReel, canvasReel, videoBackground);
  createVideoStatePoll(videoReel, setReady);
  videoEntranceAnimation(
    videoReel,
    canvasReel,
    videoBackground,
    isReady
  );

  return (
    <div ref={ref} className={styles.hero__card}>
      <video
        ref={videoReel}
        className={styles.card__video}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
      >
        {sources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>
      <canvas
        ref={canvasReel}
        className={styles.hero__canvas}
        width="2"
        height="4"
        aria-hidden="true"
      ></canvas>
    </div>
  );
}

function createVideoBackground(
  video: RefObject<HTMLVideoElement | null>,
  canvas: RefObject<HTMLCanvasElement | null>,
  videoBackground: RefObject<VideoBackground | null>
) {
  useEffect(() => {
    if (video.current && canvas.current) {
      videoBackground.current = new VideoBackground(
        video.current,
        canvas.current
      );
    }

    return () => {
      videoBackground.current?.stopRendering();
    };
  }, []);
}

function createVideoStatePoll(
    video: RefObject<HTMLVideoElement | null>,
    setReady: (value: boolean) => void
) {
  useEffect(() => {
    if (video) {

      let polling: NodeJS.Timeout;

      function checkVideoIsReady() {
        if (video.current 
            && video.current.readyState >= video.current.HAVE_FUTURE_DATA) {
          setReady(true);
          clearInterval(polling);
        }
      }

      checkVideoIsReady();
      polling = setInterval(checkVideoIsReady, 100);

      return () => clearInterval(polling);
    }
  }, []);
}

function videoEntranceAnimation(
  video: RefObject<HTMLVideoElement | null>,
  canvas: RefObject<HTMLCanvasElement | null>,
  videoBackground: RefObject<VideoBackground | null>,
  isReady: boolean
) {
  useGSAP(() => {
      if (
        video.current &&
        canvas.current &&
        videoBackground.current &&
        isReady
      ) {
        let timeline = gsap.timeline();

        timeline.from(video.current, {
          clipPath: "inset(100% 0 0 0)",
          duration: 2,
          ease: "power2",
          delay: 0.25,
        });

        timeline.from(
          canvas.current,
          {
            autoAlpha: 0,
            duration: 3,
            ease: "power2",
            onStart: () => {
              videoBackground.current?.startRendering();
            },
          },
          ">-1"
        );
      }
    },
    { dependencies: [isReady] }
  );
}
