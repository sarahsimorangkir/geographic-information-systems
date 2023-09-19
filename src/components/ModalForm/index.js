import React, {useEffect, useState} from "react";
import styles from "./index.module.css";
import ButtonColor from "../ButtonColor";
import {addTrack} from "../../api/api";

export default function ModalForm({type, points, showModal, afterSubmit, cancel, ...props}) {
    const [formField, setFormField] = useState({
        name: "",
        lat: 0,
        lng: 0,
        alt: 0,
        type: "",
    });
    useEffect(() => {
        setFormField({
            name: "",
            lat: points.lat,
            lng: points.lng,
            alt: 0,
            type: type
        });
    }, [points, type]);
    const handleOnSubmit = async (event) => {
        console.log(formField)
        await addTrack(formField, (res)=> {
            afterSubmit(res);
        })
    }
    const handleOnChange = (event) => {
        const {value, name} = event.target;
        setFormField({
            ...formField,
            [name]: value,
        });

    }

    return (
        <div className={`${styles.modalForm} ${showModal ? "" : styles.hide}`}>
            <div className={styles.modalHeader}>
                Input New {type === "plane" ? "Plane" : "Ship"}
            </div>
            <div className={styles.modalBody}>
                <div className={styles.leftSide}>
                    <div className={styles.itemInput}>
                        Name
                    </div>
                    <div className={styles.itemInput}>
                        Latitude
                    </div>
                    <div className={styles.itemInput}>
                        Longitude
                    </div>
                    {type === "plane" && <div className={styles.itemInput}>
                        Altitude
                    </div>}
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.itemInput}>
                        <input type={"text"} name={"name"} onChange={handleOnChange} value={formField.name}/>
                    </div>
                    <div className={styles.itemInput}>
                        <input type={"text"} name={"lat"} onChange={handleOnChange} value={formField.lat}/>
                    </div>
                    <div className={styles.itemInput}>
                        <input type={"text"} name={"lng"} onChange={handleOnChange} value={formField.lng}/>
                    </div>
                    {type === "plane" && <div className={styles.itemInput}>
                        <input type={"text"} name={"alt"} onChange={handleOnChange} value={formField.alt}/>
                    </div>}
                    <div className={styles.itemButton}>
                        <ButtonColor text={"Cancel"} onClick={cancel} type={"grey"}/>
                        <ButtonColor text={"Add"} onClick={handleOnSubmit} type={"primary"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}