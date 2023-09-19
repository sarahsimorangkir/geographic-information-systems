import React from "react";
import styles from "./index.module.css";

export default function ButtonColor({text, type, color,onClick, ...props}) {

    return (
        <button onClick={onClick} className={`${styles.buttonColor} ${styles[type]}`}>
            {text}
        </button>
    )
}