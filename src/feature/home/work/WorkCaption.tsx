"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Project } from "@/types/project";
import SplitType from "split-type";

import styles from "./work.module.css";

const columns = ['project', 'category', 'director', 'trt'] as const;

export default function WorkCaption({
  projects,
  activeIndex
}: {
  projects: Project[];
  activeIndex: number;
}) {

    return (
      <div className={styles.work__info}>
        <div className={styles.info__content}>
        {columns.map((column, index) => (
                <InfoColumn
                    key={column}
                    column={column}
                    projects={projects}
                    activeIndex={activeIndex}
                />
            ))}
        </div>
      </div>
    );
}

function InfoColumn({
    column,
    projects,
    activeIndex
} : {
    column: (typeof columns)[number];
    projects: Project[];
    activeIndex: number;
}) {

    const container = useRef<HTMLDivElement>(null);
    const data = useRef<HTMLHeadingElement>(null);
    const dataSplit = useRef<SplitType>(null);

    useGSAP(() => {

        if (data.current) {
            dataSplit.current = new SplitType(data.current, { types: 'chars' });

            gsap.from(dataSplit.current.chars, {
                backgroundColor: 'var(--lightColor1)',
                opacity: 0,
                stagger: 0.05,
                duration: 0.1, 
                ease: 'steps(5)',
            });
        }
    }, { scope: container, dependencies: [activeIndex]})

    return (
      <div ref={container} className={styles.info}>
        <p className={styles.info__tag}>{column}</p>
        <div className={styles.info__data}>
          <p key={activeIndex} ref={data} className={styles.info__value}>{projects[activeIndex][column]}</p>
        </div>
      </div>
    );
}