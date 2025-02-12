"use client";
import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import workStyles from "./work.module.css";
import footerStyles from "@/components/layout/footer/footer.module.css"

export default function WorkAnimationWrapper({
  children,
}: {
  children: ReactNode;
}) {

    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        
        gsap.to(`.${workStyles.work__gallery}`, {
            autoAlpha: 0.8,
            filter: "blur(3px)",
            scrollTrigger: {
                trigger: `.${footerStyles.footer__content}`,
                start: "top bottom",
                end: "top bottom+=100",
                scrub: 2,
            },
        });

    }, { scope: container })

  return <div ref={container}>{children}</div>;
}
