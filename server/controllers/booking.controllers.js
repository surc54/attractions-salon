const Booking = require("../models/booking.model");
const {
  send_code_error,
  send_code_success,
} = require("../tools");
const client = require('twilio')(
    process.env.TWILIO_ACCT_SID || require("../config/config").twilio.acctSID,
    process.env.TWILIO_AUTH_TOKEN || require("../config/config").twilio.authToken);

module.exports.create = async (req, res) => {
  const bookingNumber = Math.random().toString(36).substring(2, 11).toUpperCase();
  const phoneNumber = "+1" + req.body.phone;
  const SMSmessage = req.body.name + " has made a new appointment at Attractions Salon. Booking #" + bookingNumber;
  console.log("Booking #" + bookingNumber);
  let newBooking = {
    bookingNum: bookingNumber,
    name: req.body.name,
    date: req.body.date,
    phone: phoneNumber
  }
  const booking = new Booking(newBooking);
  booking
      .save()
      .then((response) => {
        client
        .messages
        .create({body: SMSmessage, from: '+13524882645', to: phoneNumber})
        .then(message => console.log(message.sid));
        send_code_success(res, 201);
      })
      .catch((err) => {
        send_code_error(res, 500);
        console.error("Could not save booking to database:", err);
      });
};

module.exports.read = (req, res) => {
  Booking
      .findOne({ bookingNum: req.params.bookingNum })
      .then((response) => {
        res.json(response || {});
      })
      .catch((err) => {
        send_code_error(res, 500);
        console.error("Error when finding a specific booking:", err);
      });
};

// module.exports.update = (req, res) => {
//   const group = req.group;

//   let updateID = req.params.id;
//   let updatedInfo;

//   updatedInfo = {
//       $set: {
//           groupName: req.body.groupName,
//           items: req.body.items,
//       },
//   };

//   Booking
//       .updateOne({ bookingNum: req.params.bookingNum }, updatedInfo)
//       .then(value =>
//         Listing.findById(updateID).then(successData =>
//           res.json(successData)
//         )
//       )
//       .catch(reason => res.status(500).send("Error when updating"));
// };

module.exports.delete = (req, res) => {
  Booking
      .findOneAndDelete({ bookingNum: req.params.bookingNum })
      .then((response) => {
        send_code_success(res, 200);
      })
      .catch((err) => {
        send_code_error(res, 500);
        console.error("Error when deleting", err);
      });
};

module.exports.list = (req, res) => {
  Booking
      .find({})
      .then(value => {
        res.send({
          status: "ok",
          data: value,
        });
      })
      .catch((err) => {
        send_code_error(res, 500);
        console.error("Error when finding bookings", err);
      });
};