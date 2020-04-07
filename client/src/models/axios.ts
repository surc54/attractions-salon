import realaxios from "axios";

// Define default settings here
const axios = realaxios.create({
    withCredentials: true,
});

export default axios;
