const fs = require("fs");
const path = require("path");

///////////////// Testing
const stylists = require("../models/stylist.model.js");
/////////////////

//Load data from JSON file. Delete when switching to database.
let stylistArray = [];
const TEMP_DATA_LIST_FILE = path.resolve(
    __dirname,
    "../config",
    "stylists.json"
);

{
    let fileData;
    try {
        fileData = fs.readFileSync(TEMP_DATA_LIST_FILE);
        stylistArray = JSON.parse(fileData);
    } catch (e) {
        stylistArray = [];
        console.error("Could not get stylist data: ", e);
    }
}

module.exports.list = (req, res) => {
    
    // initialize database
    stylistArray.forEach(item => {
        // this works
        let newGroup = new stylists(item);
        newGroup.save();
    });
    res.send({
        status: "ok",
        data: stylistArray,
    });
    stylists
        .find({})
        .then(value => {
            res.send({
                status: "ok",
                data: value,
            });
        })
        .catch(reason => res.status(200).send("Error when finding stylists"));
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
        data: servicesArray,
    });

    // experimental stuff below this

    let data;

    // if creating a new group
    data = {
        groupName: groupName,
        items: items, // assuming both fields exist
    };

    let newData = new services(data);

    // newData
    //     .save()
    //     .then(successData => res.json(successData))
    //     .catch(reason =>
    //         res.status(200).send("Some message that indicates an error")
    //     );
};

module.exports.update = (req, res) => {
    const group = req.group;

    /* Replace the listings's properties with the new properties found in req.body */

    let updateID = req.params.id;
    let updatedInfo;

    updatedInfo = {
        $set: {
            groupName: req.body.groupName,
            items: req.body.items,
        },
    };

    Listing.updateOne({ _id: updateID }, updatedInfo)
        .then(value =>
            Listing.findById(updateID).then(successData =>
                res.json(successData)
            )
        )
        .catch(reason => res.status(200).send("Error when updating"));
};

module.exports.delete = (req, res) => {
    let toRemove = req.params.id;

    Listing.findOneAndDelete({ _id: toRemove })
        .then(value => res.json(value))
        .catch(reason => res.status(200).send("Error when deleting"));
};
