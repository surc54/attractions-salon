const fs = require("fs");
const path = require("path");

///////////////// Testing
const bookings = require("../models/booking.model.js"); // TODO: get Caleb's path to this file
/////////////////

//Load data from JSON file. Delete when switching to database.
let bookingsArray = [];
const TEMP_DATA_LIST_FILE = path.resolve(
    __dirname,
    "../config",
    "bookings.json" // <-- TODO: Create this test data set
);

{
    let fileData;
    try {
        fileData = fs.readFileSync(TEMP_DATA_LIST_FILE);
        bookingsArray = JSON.parse(fileData);
    } catch (e) {
        bookingsArray = [];
        console.error("Could not get booking data: ", e);
    }
}

{/**afdgdfbdfdbfd */}

module.exports.list = (req, res) => {
    
    // initialize database
    // bookingsArray.forEach(item => {
    //     // this works
    //     let newGroup = new bookings(item);
    //     newGroup.save();
    // });
    // res.send({
    //     status: "ok",
    //     data: bookingsArray,
    // });
    bookings
        .find({})
        .then(value => {
            res.send({
                status: "ok",
                data: value,
            });
        })
        .catch(reason => res.status(200).send("Error when finding bookings"));
};

module.exports.read = (req, res) => {
    bookings
        .findById({ _id: req.params.id })
        .then(successData => res.json(successData || {}))
        .catch(reason =>
            res.status(200).send("Error when finding a specific booking")
        );

    // res.send({
    //     status: "ok",
    //     data: bookingsArray,
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
        data: bookingsArray,
    });

    // experimental stuff below this

    let data;

    // if creating a new group
    data = {
        groupName: groupName,
        items: items, // assuming both fields exist
    };
    // TO-DO
    // Find by groupName, if found & equal => done
    // Find by groupName, if found & unequal => what do I do?
    // if not found, add new group

    // should I check if same group already exists?
    // to not create duplicates

    let newData = new bookings(data);

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
