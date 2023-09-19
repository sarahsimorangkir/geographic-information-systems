import React from "react";

import styles from "./index.module.css";

export default function IconButton({image, onClick, ...props}) {

    return (<div onClick={onClick} role={"button"} className={styles.buttonIcon}>
        <img src={image} alt={"icon"}/>
    </div>);
}