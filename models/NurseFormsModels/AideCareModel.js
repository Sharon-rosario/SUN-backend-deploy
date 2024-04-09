const mongoose = require("mongoose");

const aideCareSchema = new mongoose.Schema(
    {
      assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
        required: [false, "assignment Id is requiered"],
      },
      patient_name: {
        type: String,
        required: [false, `Please add the nurse name`],
      },
      dob: {
        type: String,
        required: [false, `Please add the dob`],
      },
      address: {
        type: String,
        required: [false, `Please add the address`],
      },
      phoneNumber: {
        type: String,
        unique: [false, "Phone number already exists"],
        required: [false, `Please add the contact no.`],
      },
  
      city: {
        type: String,
        required: [false, `Please add the city`],
      },
      state: {
        type: String,
        required: [false, `Please add the state`],
      },
      zip: {
        type: String,
        required: [false, `Please add the zip`],
      },
  
      //-------------
      emergencyContactName: {
        type: String,
        required: [false, `Please add the address`],
      },
      emergencyContactPhone: {
        type: String,
        required: [false, `Please add the address`],
      },
  
      // ------------------------------------------------------
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
  
      clientDxProblem: {
        type: String,
      },
      // --------------------------------------------------------------------------
      liveAlone: {
        type: Boolean,
        default: false,
      },
      liveWithOther: {
        type: Boolean,
        default: false,
      },
      aloneDuringDay: {
        type: Boolean,
        default: false,
      },
      bedBound: {
        type: Boolean,
        default: false,
      },
      bedRest: {
        type: Boolean,
        default: false,
      },
      upAsTolerated: {
        type: Boolean,
        default: false,
      },
      amputee: {
        type: Boolean,
        default: false,
      },
      amputeSpecify: {
        type: String,
      },
      partialWeightBearing: {
        type: Boolean,
        default: false,
      },
      partialWeightBearingRL: {
        type: Boolean,
        default: false,
      },
      //----------------------------
      nonWeightBearing: {
        type: Boolean,
        default: false,
      },
      nonWeightBearingRL: {
        type: Boolean,
        default: false,
      },
      fallPrecautions: {
        type: Boolean,
        default: false,
      },
      speechDeficit: {
        type: Boolean,
        default: false,
      },
      visionDeficit: {
        type: Boolean,
        default: false,
      },
      glasses: {
        type: Boolean,
        default: false,
      },
      contacts: {
        type: Boolean,
        default: false,
      },
      visionOther: {
        type: String,
        default: "",
      },
      hearingDeficit: {
        type: Boolean,
        default: false,
      },
      hearingAid: {
        type: Boolean,
        default: false,
      },
      //------------------------------------
      dentures: {
        type: Boolean,
        default: false,
      },
      upper: {
        type: Boolean,
        default: false,
      },
      lower: {
        type: Boolean,
        default: false,
      },
      partial: {
        type: Boolean,
        default: false,
      },
      forgetfull: {
        type: Boolean,
        default: false,
      },
      urinaryCatheter: {
        type: Boolean,
        default: false,
      },
      prosthesis: {
        type: Boolean,
        default: false,
      },
      prosthesisInfo: {
        type: String,
        default: "",
      },
      allergies: {
        type: Boolean,
        default: false,
      },
      allergiesInfo: {
        type: String,
        default: "",
      },
      //------------------------------
      diabetic: {
        type: Boolean,
        default: false,
      },
      doNotCutNails: {
        type: Boolean,
        default: false,
      },
      diet: {
        type: Boolean,
        default: false,
      },
      dietInfo: {
        type: String,
        default: "",
      },
      seizurePrecaution: {
        type: Boolean,
        default: false,
      },
      proneToFactures: {
        type: Boolean,
        default: false,
      },
      precautionOther: {
        type: String,
        default: "",
      },
      //---------------------------------
      bath_tubShower: {
        type: Boolean,
        default: false,
      },
      bath_bedBath: {
        type: Boolean,
        default: false,
      },
      bath_assistBathChair: {
        type: Boolean,
        default: false,
      },
      bathOtherInfo: {
        type: String,
        default: "",
      },
      //----------------------------------------------------
      personalCare: {
        type: Boolean,
        default: false,
      },
      personalCare_assistWithDressing: {
        type: Boolean,
        default: false,
      },
      personalCare_groomHair: {
        type: Boolean,
        default: false,
      },
      personalCare_shampoo: {
        type: Boolean,
        default: false,
      },
      personalCare_skinCare: {
        type: Boolean,
        default: false,
      },
      personalCare_teethCare: {
        type: Boolean,
        default: false,
      },
      personalCare_other: {
        type: Boolean,
      },
      personalCare_otherSpecify: {
        type: String,
      },
      personalCare_otherInfo: {
        type: String,
        default: "",
      },
      //---------------------------------------
      procedures_toiletingAssist: {
        type: Boolean,
        default: false,
      },
      procedures_catheterCare: {
        type: Boolean,
        default: false,
      },
      procedures_ostomyCare: {
        type: Boolean,
        default: false,
      },
      procedures_medicationReminder: {
        type: Boolean,
        default: false,
      },
      procedures_other: {
        type: Boolean,
      },
      procedures_otherSpecify: {
        type: String,
      },
      procedures_otherInfo: {
        type: String,
        default: "",
      },
      //----------------------------
      activity_assistWith: {
        type: Boolean,
        default: false,
      },
      activity_mobilityAssist: {
        type: Boolean,
        default: false,
      },
      activity_exercise: {
        type: Boolean,
        default: false,
      },
      activity_other: {
        type: Boolean,
      },
      activity_otherSpecify: {
        type: String,
      },
      activity_otherInfo: {
        type: String,
        default: "",
      },
      //---------------------------------------------
      nutrition_mealPreparation: {
        type: Boolean,
        default: false,
      },
      nutrition_assistWithFeeding: {
        type: Boolean,
        default: false,
      },
      nutrition_fluid: {
        type: Boolean,
        default: false,
      },
      nutrition_groceryShopping: {
        type: Boolean,
        default: false,
      },
      nutrition_other : {
        type: Boolean
      },

      nutrition_otherSpecify : {
        type: String
      },
      nutrition_otherInfo: {
        type: String,
        default: "",
      },
      //--------------------------------------------------
      other_laundry: {
        type: Boolean,
        default: false,
      },
      other_houseKeeping: {
        type: Boolean,
        default: false,
      },
      other_equipmentCare: {
        type: Boolean,
        default: false,
      },
      other_transportation: {
        type: Boolean,
        default: false,
      },
      other_otherInfo: {
        type: String,
        default: "",
      },
    },
  {
    timestamps: false,
  }
);

const AideCarePlan = mongoose.model("AideCarePlan", aideCareSchema);





module.exports = AideCarePlan;
