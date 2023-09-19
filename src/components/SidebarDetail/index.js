import React from "react";
import styles from "./index.module.css";

export default function SidebarDetail({detail, showDetail, close,...props}) {

    return (
        <div className={`${styles.sidebarDetail} ${showDetail ? "" : styles.hide}`}>
            <div className={styles.header}>
                <p>Object Info</p>
            </div>

            <div className={styles.body}>
                <table>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td>{detail.name}</td>
                    </tr>
                    <tr>
                        <td>Longitude</td>
                        <td>:</td>
                        <td>{detail.additional_info.features[0].geometry.coordinates[0]}</td>
                    </tr>
                    <tr>
                        <td>Latitude</td>
                        <td>:</td>
                        <td>{detail.additional_info.features[0].geometry.coordinates[1]}</td>
                    </tr>
                    <tr>
                        <td>Altitude</td>
                        <td>:</td>
                        <td>{detail.additional_info.features[0].geometry.coordinates[2]}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className={styles.footer}>
                <button onClick={close}>
                    Close
                </button>
            </div>
        </div>
    );
}