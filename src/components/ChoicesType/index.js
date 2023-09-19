import React, {useState} from "react";
import styles from "./index.module.css";
import Plane from "../../assets/icons/Vector.png";
import Ship from "../../assets/icons/Vector(1).png";

export default function ChoicesType({onClick = (event, value)=> {},showTypes = true, ...props}) {
    const [types] = useState([
        {type: "ship", image: Ship},
        {type: "plane", image: Plane},
    ]);
    return <div className={`${styles.choicesType} ${showTypes ? '': styles.hide}`}>
        {types.map((value, index) => (
            <div key={`card-${index}`} className={styles.item}>
                <div onClick={(event) => onClick(event, value)}>
                    <img src={value.image} alt={"icon"}/>
                </div>
            </div>
        ))}
    </div>
}
