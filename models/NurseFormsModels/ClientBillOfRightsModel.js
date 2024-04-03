const mongoose = require("mongoose");

const clientBillOfRightsSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: [true, "assignment Id is requiered"],
  },
  signature: {
    type: String,
    required: true,
  },
  dateSigned: {
    type: Date,
    // default: Date.now,
  },
});

const ClientBillOfRights = mongoose.model(
  "ClientBillOfRights",
  clientBillOfRightsSchema
);

module.exports = ClientBillOfRights;
