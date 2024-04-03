const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    company_name: {
      type: String,
      unique: [true, "unit with same name already exists"],
      required: [true, `Please add the unit name`],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", CompanySchema);
