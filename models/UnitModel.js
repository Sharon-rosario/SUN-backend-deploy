const mongoose = require("mongoose");

const UnitSchema = mongoose.Schema(
  {
    // unit_name: {
    //   type: String,
    //   unique: [true, "unit with same name already exists"],
    //   required: [true, `Please add the unit name`],
    // },
    unit_name:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
    programs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Unit", UnitSchema);
