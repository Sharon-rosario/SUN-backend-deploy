const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema(
  {
    patient_name: { type: String },
    ss: { type: String },
    mcr: { type: String },
    mcd: { type: String },
    specialRequest: { type: String },
    dob: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    relativeNameFirst: { type: String },
    relativeContactFirst: { type: String },
    caseMgrName: { type: String },
    caseMgrPhone: { type: String },
    caseMgrEmail: { type: String },
    doctorName: { type: String },
    npi: { type: Number },
    doctorPhone: { type: String },
    doctorAddress: { type: String },
    doctorCity: { type: String },
    doctorState: { type: String },
    doctorZip: { type: String },
    days: {
      sunday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'TimeSlot',
        },
      ],
      monday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'TimeSlot',
        },
      ],
      tuesday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'TimeSlot',
        },
      ],
      wednesday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'TimeSlot',
        },
      ],
      thursday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'TimeSlot',
        },
      ],
      friday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'TimeSlot',
        },
      ],
      saturday: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'TimeSlot',
        },
      ],
    },
    programs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
      },
    ],
    image: { type: String },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Patient", PatientSchema);
