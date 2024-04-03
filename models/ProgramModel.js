const mongoose = require("mongoose");

const ProgramSchema = mongoose.Schema(
  {
    program_name: {
      type: String,
      unique: [true, "program with same name already exists"],
      required: [true, `Please add the program name`],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Program", ProgramSchema);
