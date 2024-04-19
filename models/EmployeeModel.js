const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `Please add the employee name`],
    },
    ready_to_work_extra_hours: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, `please add employee password`]
    },
    evv: {
      type: String,
      required: [true, `Please add the evv number`],
    },
    role: {
      type: String,
      enum: ['Nurse', 'HHA'],
      required: [true, `Please add the employee role`],
    },
    phoneNumber: {
      type: String,
      unique: [true, "Phone number already exists"],
      required: [true, `Please add the contact no.`],
    },
    email: {
      type: String,
      unique: [true, "Nurse with same email already exists"],
      required: [true, `Please add the email address`],
    },
    address: {
      type: String,
      required: [true, `Please add the address`],
    },
    relativeNameFirst: {
      type: String,
      required: [true, `Please add the relative 1 name`],
    },
    relativeContactFirst: {
      type: String,
      required: [true, `Please add the relative 1 contact no.`],
    },
    relativeNameSecond: {
      type: String,
      // required: [true, `Please add the relative 2 name`],
    },
    relativeContactSecond: {
      type: String,
      // required: [true, `Please add the relative 2 contact no.`],
    },
    // availability: {
    //   type: [String],
    //   default: [],
    //   required: [true, `Must have atleast one day inside availability array`],
    // },
    // timeSlots: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "TimeSlot",
    //   },
    // ],
    sundayTimeSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
      },
    ],
    mondayTimeSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
      },
    ],
    tuesdayTimeSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
      },
    ],
    wednesdayTimeSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
      },
    ],
    thursdayTimeSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
      },
    ],
    fridayTimeSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
      },
    ],
    saturdayTimeSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
      },
    ],
    image: {
      type: String,
    },
    resetPasswordOTP: {
      type: String,
      required: false
    },
    resetPasswordOTPExpires: {
      type: Date,
      required: false
    },
    company: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
