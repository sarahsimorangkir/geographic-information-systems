import styles from './App.module.css';
import React, {useState} from "react";
import IconButton from "./components/IconButton";
import ButtonAdd from "./assets/icons/icon-park-solid_add.png"
import ModalForm from "./components/ModalForm";
import ChoicesType from "./components/ChoicesType";
import LocationMark from "./assets/icons/pepicons-pop_line-x-off.png";
import PlaneMark from "./assets/icons/plane-1.png";
import ShipMark from "./assets/icons/ship-1.png";
import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import SidebarDetail from "./components/SidebarDetail";

const containerStyle = {
    width: '100%',
    height: '100vh'
};

function App() {
    // load the google maps API and check if it's loaded
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        id: 'google-map-script',
    });

    const [markers, setMarkers] = useState([]);
    const [detailSelected, setDetailSelected] = useState({
        type: "",
        value: {
            lat: 0,
            lng: 0,
        },

    });
    const [showModal, setShowModal] = useState(false);
    const [showChoices, setShowChoices] = useState(false);
    const [sidebarDetail, setSidebarDetail] = useState(null);

    const [center, setCenter] = useState({lat: -4.853523, lng: 113.916672})

    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleOnClickMap = (map) => {
        setSelectedLocation({
            lat: map.latLng.lat(),
            lng: map.latLng.lng(),
        });
    }

    const handleOnClickButtonAdd = (event) => {
        setShowChoices(!showChoices);
    }
    //handle a choice click and open the modal form
    const handleOnClickChoice = (event, value) => {
        if (selectedLocation !== null) {
            setDetailSelected({
                ...detailSelected,
                value: {
                    lat: selectedLocation.lat,
                    lng: selectedLocation.lng,
                },
                type: value.type,
            })
        } else {
            setDetailSelected({
                ...detailSelected,
                value: {
                    lat: 0,
                    lng: 0,
                },
                type: value.type,
            })
        }
        setShowModal(true);
    }

    const closeModal = (event) => {
        setShowModal(false);
    }

    //callback function after submitting the form
    const clbAfterSubmit = (res) => {
        setMarkers([...markers, res]);
        // update markers with the new result
        setShowModal(false);
        setShowChoices(false);
        setSelectedLocation(null);
        // update the center of the map to the new marker
        setCenter({
            lat: res.additional_info.features[0].geometry.coordinates[0],
            lng: res.additional_info.features[0].geometry.coordinates[1],
        });
    }

    return (
        <div className={styles.wrapperMap}>
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={5}
                    onClick={handleOnClickMap}
                >
                    {selectedLocation !== null &&
                        <Marker
                            position={{lat: selectedLocation.lat, lng: selectedLocation.lng}}
                            icon={{
                                scaledSize: {
                                    height: 30,
                                    width: 30,
                                },
                                url: LocationMark,
                            }}
                        />}
                    {markers.length &&
                        markers.map((item, index) => (
                            <Marker
                                onClick={()=> setSidebarDetail(item)}
                                key={index}
                                position={{
                                    lat: item.additional_info.features[0].geometry.coordinates[0],
                                    lng: item.additional_info.features[0].geometry.coordinates[1]
                                }}
                                icon={{
                                    scaledSize: {
                                        height: 30,
                                        width: 30,
                                    },
                                    url: item.additional_info.type === "ship" ? ShipMark : PlaneMark,
                                }}
                            />
                        ))}
                </GoogleMap>
            )}
            <ModalForm type={detailSelected.type} cancel={closeModal} points={detailSelected.value}
                       showModal={showModal} afterSubmit={clbAfterSubmit}/>
            <IconButton image={ButtonAdd} onClick={handleOnClickButtonAdd}/>
            <ChoicesType showTypes={showChoices} onClick={handleOnClickChoice}/>
            {sidebarDetail !== null && <SidebarDetail close={(event)=> {
                setSidebarDetail(null);
            }} showDetail={true} detail={sidebarDetail}/>}
        </div>
    );
}

export default App;
