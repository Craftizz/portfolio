"use client";

import { ReactNode, useRef, useState } from "react";

import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import styles from "./header.module.css";

export default function NavLink({
  href,
  variant,
  children,
  target,
}: {
  href: string;
  variant: "filled" | "transparent";
  children: ReactNode;
  target?: "_self";
}) {
    
//   const button = useRef(null);
//   const timelineRef = useRef<GSAPTimeline>(null);

//   const [isAnimating, setAnimating] = useState(false);




//   const { contextSafe } = useGSAP(() => {

//     const timeline = gsap.timeline({
//         paused: true,
//         onComplete: () => setAnimating(false)
//     });

//     timelineRef.current = timeline;

//     timeline.fromTo(button.current,
//         { yPercent: 0 },
//         { duration: 0.5,
//           yPercent: -100,
//         }
//       );
  
//     timeline.fromTo(button.current,
//         { yPercent: -100 },
//         { duration: 0.5,
//           y: 0,
//         },
//         "<"
//       );

//   }, { scope: button });

//   const mouseEnterAnimation = contextSafe(() => {
//     if (isAnimating || !timelineRef.current) {
//         return;
//     }

//     setAnimating(true);
//     timelineRef.current.restart();
//   });

  // function mouseEnterAnimation() {
  //     contextSafe(() => {
  //         console.log('yes');
  //         gsap.to(button.current, {
  //             top: "-100%",
  //             duration: 0.3
  //         });
  //     });
  // }

  return (
    <Link href={href} target={target}>
      <button
        // ref={button}
        className={`${styles.button} ${
          variant === "transparent"
            ? styles.button__transparent
            : styles.button__bordered
        }`}
        // onMouseEnter={mouseEnterAnimation}
      >
        {children}
      </button>
    </Link>
  );
}
