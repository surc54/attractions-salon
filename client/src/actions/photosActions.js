import axios from "../models/axios";
import Config from "../models/Config";

export const getPhotos = async () => {
    let returnVal;

    await axios
        .request({
            ...Config.apiUrls["get photos info"],
        })
        .then(value => {
            returnVal = value.data.data; 
            console.log(value.data.data)
            return returnVal;
        })
        .catch(reason => {
            console.log(reason);
        });

    return returnVal;
};

export const addPhotos = async () => {
    let returnVal;

    await axios
        .request({
            ...Config.apiUrls["add photos info"],
        })
        .then(value => {
            returnVal = value.data.data; 
            console.log(value.data.data)
            return returnVal;
        })
        .catch(reason => {
            console.log(reason);
        });

    return returnVal;
};