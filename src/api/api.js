import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const addTrack = async (data, callbackSuccess = (response) => {
}, callbackError = (err) => {
}) => {
    try {
        let response = await axios.post("/track", {
            "additional_info": {
                "features": [
                    {
                        "geometry": {
                            "coordinates": [
                                Number.parseInt(data.lat),
                                Number.parseInt(data.lng),
                                Number.parseInt(data.alt),
                            ],
                            "type": data.type,
                        },
                        "properties": "-",
                        "type": data.type,
                    }
                ],
                "type": data.type,
            },
            "name": data.name,
            "track_id": `${new Date().getTime()}`,
            "track_name": `${data.type}-track-${new Date().getTime()}`
        });
        let dataAfter = response.data.data;
        dataAfter.additional_info.features[0].geometry.coordinates = [
            Number(data.lat),
            Number(data.lng),
            Number(data.alt),
        ];
        callbackSuccess(dataAfter);
    } catch (err) {
        callbackError(err);
    }
};
