const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema(
  {
    location_name: {
      type: String,
      unique: [true, "Location with same name already exists"],
      required: [true, `Please add the location name`],
    },
    units: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", LocationSchema);
