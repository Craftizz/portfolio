"use client";

import { useError } from "@/context/ErrorContext";
import styles from "./error-alert.module.css";

export default function ErrorAlert() {

    const { error } = useError();

    if (!error) {

        return null;
    }

    return (
        <div className={styles.error}>
            <p className={styles.error__info}>Please refresh the page, {error}</p>
        </div>
    );
}