const fs = require("fs");
const path = require("path");

///////////////// Testing
const photos = require("../models/photos.model.js");
/////////////////

//Load data from JSON file. Delete when switching to database.
let photosArray = [];
const TEMP_DATA_LIST_FILE = path.resolve(
    __dirname,
    "../config",
    "photos.json"
);

{
    let fileData;
    try {
        fileData = fs.readFileSync(TEMP_DATA_LIST_FILE);
        photosArray = JSON.parse(fileData);
    } catch (e) {
        photosArray = [];
        console.error("Could not get photos data: ", e);
    }
}

module.exports.list = (req, res) => {
    
    // initialize database
    // photosArray.forEach(item => {
    //     let newGroup = new photos(item);
    //     newGroup.save();
    // });
    // res.send({
    //     status: "ok",
    //     data: photosArray,
    // });
    photos
        .find({})
        .then(value => {
            res.send({
                status: "ok",
                data: value,
            });
        })
        .catch(reason => res.status(200).send("Error when finding photos"));
};

module.exports.read = (req, res) => {
    photos
        .findById({ _id: req.params.id })
        .then(successData => res.json(successData || {}))
        .catch(reason =>
            res.status(200).send("Error when finding a specific photo")
        );

    // res.send({
    //     status: "ok",
    //     data: servicesArray,
    // });
};

module.exports.create = (req, res) => {
    console.log('printing newData')
    const photo = {
        id: req.body.id,
        imgURL: req.body.imgURL
    }

    let newData = new photos(photo);
    console.log('printing newData')
    console.log(newData)
    newData.save()
        .then((resp) => {
            //send_code_success(res,201, "photo save success");
            return res.status(200).json(resp)
        .catch((err) => {
            send_code_error(res,500, "photo save error");
            console.error("Could not save photo to database:", err);
        })
    
    })
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

    photos.updateOne({ _id: updateID }, updatedInfo)
        .then(value =>
            photos.findById(updateID).then(successData =>
                res.json(successData)
            )
        )
        .catch(reason => res.status(200).send("Error when updating"));
};

module.exports.delete = (req, res) => {
    let toRemove = req.params.id;

    photos.findOneAndDelete({ _id: toRemove })
        .then(value => res.json(value))
        .catch(reason => res.status(200).send("Error when deleting"));
};