const fs = require("fs");
const path = require("path");

///////////////// Testing
const services = require("../models/services.model.js");
/////////////////

// to import json from a file try this:
// const export data = ...some data
// import {data} from '../filepath'

// or export default { something }
// then either import { something }
// or import someImport -> someImport.something (?)

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
        .then((value) => {
            res.send({
                status: "ok",
                data: value,
            });
        })
        .catch((reason) => res.status(400).send("Error when finding services"));
};

module.exports.read = (req, res) => {
    services
        .findById({ _id: req.params.id })
        .then((successData) => res.json(successData || {}))
        .catch((reason) =>
            res.status(400).send("Error when finding a specific service")
        );
};

module.exports.create = (req, res) => {
    let {
        groupName,
        name,
        price,
        description, // how to deal with optional fields?
        subtitle,
        imgURL,
    } = req.body;

    // experimental stuff below this

    let data;

    // if creating a new group
    data = {
        groupName: groupName,
        name: name,
        price: price,
        description: description ? description : undefined,
        subtitle: subtitle ? subtitle : undefined,
        // no img URL yet
    };

    let newData = new services(data);

    // check if it already exists

    newData
        .save()
        .then((successData) => res.json(successData))
        .catch((reason) =>
            res.status(400).send("Error when creating new service")
        );
};

module.exports.update = (req, res) => {
    let {
        groupName,
        name,
        price,
        description, // how to deal with optional fields?
        subtitle,
        imgURL,
    } = req.body;

    /* Replace the listings's properties with the new properties found in req.body */

    let updateID = req.params.id;
    
    let updatedInfo = {
        $set: {
            name: name ? name : undefined,
            price: price ? price : undefined,
            groupName: groupName ? groupName : undefined,
            description: description ? description : undefined,
            subtitle: subtitle ? subtitle : undefined,
            // no imgURL yet
        },
    };

    Listing.updateOne({ _id: updateID }, updatedInfo)
        .then((value) =>
            Listing.findById(updateID).then((successData) =>
                res.json(successData)
            )
        )
        .catch((reason) => res.status(400).send("Error when updating"));
};

module.exports.delete = (req, res) => {
    let toRemove = req.params.id;

    Listing.findOneAndDelete({ _id: toRemove })
        .then((value) => res.json(value))
        .catch((reason) => res.status(400).send("Error when deleting"));
};
