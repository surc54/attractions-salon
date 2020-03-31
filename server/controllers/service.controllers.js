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
    
    // initialize database
    // servicesArray.forEach(item => {
    //     // this works
    //     let newGroup = new services(item);
    //     newGroup.save();
    // });
    // res.send({
    //     status: "ok",
    //     data: servicesArray,
    // });
    services
        .find({})
        .then(value => {
            res.send({
                status: "ok",
                data: value,
            });
        })
        .catch(reason => res.status(200).send("Error when finding services"));
};

module.exports.read = (req, res) => {
    services
        .findById({ _id: req.params.id })
        .then(successData => res.json(successData || {}))
        .catch(reason =>
            res.status(200).send("Error when finding a specific service")
        );

    // res.send({
    //     status: "ok",
    //     data: servicesArray,
    // });
};

module.exports.create = (req, res) => {
    /// assuming it looks like this ///
    let groupName = req.body.groupName;
    let items = req.body.items;

    // need to allow to create an item
    // or an entirely new group
    // but I dont know the syntax

    res.send({
        status: "ok",
        data: services,
    });
};
