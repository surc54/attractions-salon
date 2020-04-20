//const fs = require("fs");
//const path = require("path");

const services = require("../models/services.model.js");

// to import json from a file try this:
// const export data = ...some data
const data = require('../config/services.json');

// or export default { something }
// then either import { something }
// or import someImport -> someImport.something (?)

module.exports.list = async (req, res) => {
    // initialize database
    //await for(let i = 0 ; data.length; i++){
    //    let newGroup = new services(item);
    //    newGroup.save();  
    //} // i was reading stuff, but I am not sure either
    //// ahhh map & insert one, seems legit
    //// im going to go and empty my databse brb
    //// not sure how to check for that number
    //services.find({}) == []?; // right
    //
    //servicesArray.forEach(item => {
    //    // this works
    //    
    //}) 

    services
       .find({})
       .then((value) => {
            if (value.length === 0) {
                
                services.bulkWrite(data.map(service => ({
                    insertOne: {
                        document: service // i htink thats it
                    }
                }))).then(() => {
                    services
                    .find({})
                    .then((value) => res.send({
                        status: "ok",
                        data: value,
                    }));
                }); 
                

            } else {
                res.send({
                    status: "ok",
                    data: value,
                });
            }
       })
       .catch((reason) => res.status(500).send("Error when finding services"));
};

module.exports.read = (req, res) => {
    services
        .findById({ _id: req.params.id })
        .then((successData) => res.json(successData || {}))
        .catch((reason) =>
            res.status(500).send("Error when finding a specific service")
        );
};

module.exports.admin = {};

module.exports.admin.delete = (req, res) => {
    let toRemove = req.params.id;

    //console.log("attempting to remove", toRemove);

    services
        .findOneAndDelete({ _id: toRemove })
        .then((value) => {
            res.json(value);
        })
        .catch((reason) => {
            res.status(500).send("Error when deleting");
        });
};

module.exports.admin.update = (req, res) => {
    let {
        groupName,
        name,
        price,
        description, // how to deal with optional fields?
        __v, // how to deal with optional fields?
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
            imgURL: imgURL,
            __v: __v,
            // no imgURL yet
        },
    };

    services
        .updateOne({ _id: updateID }, updatedInfo)
        .then((value) =>
        services.findById(updateID).then((successData) =>
                res.json(successData)
            )
        )
        .catch((reason) => res.status(500).send("Error when updating"));
};

module.exports.admin.create = (req, res) => {
    let { groupName, name, price, description, subtitle, imgURL } = req.body;

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
            res.status(500).send("Error when creating new service")
        );
};
