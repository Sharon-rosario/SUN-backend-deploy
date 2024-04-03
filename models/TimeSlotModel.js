const mongoose = require("mongoose");

const TimeSlotSchema = mongoose.Schema(
  {
    timeSlot_name: {
      type: String,
      unique: [true, "timeSlot with same name already exists"],
      required: [true, `Please add the timeSlot name`],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TimeSlot", TimeSlotSchema);
