const fs = require("fs");
const path = require("path");

// Load data from JSON file. Delete when switching to database.
let services = [];
const TEMP_DATA_LIST_FILE = path.resolve(
    __dirname,
    "../config",
    "services.json"
);

{
    let fileData;
    try {
        fileData = fs.readFileSync(TEMP_DATA_LIST_FILE);
        services = JSON.parse(fileData);
    } catch (e) {
        services = [];
        console.error("Could not get services data: ", e);
    }
}

// Update later to use database.
module.exports.list = (req, res) => {
    res.send({
        status: "ok",
        data: services,
    });
};
