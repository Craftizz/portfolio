import styles from "./card-caption.module.css";
import { Frame } from "@/types/frames";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import SplitType from 'split-type';

export default function CardCaption({ metadata }: { metadata: Frame }) {

    const projectRef = useRef(null);
    const categoryRef = useRef(null);

    useGSAP(() => {

        let timeline = gsap.timeline({
            scrollTrigger: {
                trigger: projectRef.current,
                start: "top bottom-=10%",
              },
        });

        if (projectRef.current) {

            const project = new SplitType(projectRef.current, { types: "chars" });

            timeline.from(project.chars, {
              backgroundColor: "var(--lightColor1)",
              opacity: 0,
              stagger: 0.05,
              duration: 0.1,
              ease: "steps(5)",
            });
        }

        if (categoryRef.current) {

            const category = new SplitType(categoryRef.current, { types: "chars" });

            timeline.from(category.chars, {
                backgroundColor: "var(--lightColor1)",
                opacity: 0,
                stagger: 0.05,
                duration: 0.1,
                ease: "steps(5)",
              });
        }
    });

    return (
        <div className={styles.card__caption}>
            <p className={styles.card__project} ref={projectRef}>{metadata.title}</p>
            <p className={styles.card__category} ref={categoryRef}>{metadata.category}</p>
        </div>
    );
}