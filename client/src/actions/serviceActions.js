import axios from "../models/axios";
import Config from "../models/Config";

export const getServices = async () => {
    let returnVal;

    await axios
        .request({
            ...Config.apiUrls["get services info"],
        })
        .then(value => {
            returnVal = value.data.data; 
            //why so much? check later
            // maybe one for axios
            // maybe one for router (+ status)
            // also, gets executed a lot of times (why?)
            //console.log(value.data.data)
            return returnVal;
        })
        .catch(reason => {    // I should do something that makes it easier to debug
            console.log(reason);
        });

    return returnVal;
};
