const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema(
  {
    patient_name: {
      type: String,
      required: [false, `Please add the nurse name`],
    },
    ss: {
      type: String,
      required: [false, 'Please add the Social Security Number'],
      // match: [/^\d{3}-\d{2}-\d{4}$/, 'Please add a valid Social Security Number (e.g., 123-45-6789)']
    },
    mcr: {
      type: String,
      required: [false, 'Please add the Medicare Number'],
      // Add any specific validation for Medicare Number if required
    },
    mcd: {
      type: String,
      required: [false, 'Please add the Medicaid Number'],
      // Add any specific validation for Medicaid Number if required
    },
    specialRequest: {
      type: String,
      required: false
    },
    dob: {
      type: String,
      required: [false, `Please add the dob`],
    },
    city:{
      type: String,
      required: [false, `Please add the city`],
    },

    state:{
      type: String,
      required: [false, `Please add the state`],
    },
    zip:{
      type: String,
      required: [false, `Please add the zip`],
    },
    phoneNumber: {
      type: String,
      // unique: [false, "Phone number already exists"],
      required: [false, `Please add the contact no.`],
    },
    address: {
      type: String,
      required: [false, `Please add the address`],
    },
    relativeNameFirst: { //emergency contact
      type: String,
      required: [false, `Please add the relative 1 name`],
    },
    relativeContactFirst: { //emergency contact number
      type: String,
      // required: [false, `Please add the relative 1 contact no.`],
    },
    // relativeNameSecond: {
    //   type: String,
    //   required: [false, `Please add the relative 2 name`],
    // },
    // relativeContactSecond: {
    //   type: String,
    //   required: [false, `Please add the relative 2 contact no.`],
    // },
    caseMgrName: {
      type: String,
      required: [false, `Please add the case Mgr name.`],
    },
    caseMgrPhone: {
      type: String,
      required: [false, `Please add the case Mgr contact no.`],
    },
    // caseMgrFax: {
    //   type: String,
    //   required: [false, `Please add the case Mgr fax no.`],
    // },
    caseMgrEmail: {
      type: String,
      required: [false, `Please add the case Mgr email address`],
    },
    doctorName: { //physician
      type: String,
      required: [false, `Please add the doctor's name`],
    },
    npi:{
      type: Number,
      required: [false, `Please add the doctor's NPI`],
    },
    doctorPhone: {
      type: String,
      required: [false, `Please add the case doctor's contact no.`],
    },
    doctorAddress: { //changed fax to address
      type: String,
      required: [false, `Please add the case doctor's fax no.`],
    },
    doctorCity:{
      type: String,
      required: [false, `Please add the case doctor's city.`],
    },
    doctorState:{
      type: String,
      required: [false, `Please add the case doctor's state.`],
    },
    doctorZip:{
      type: String,
      required: [false, `Please add the case doctor's zip.`],
    },
    // daysNeeded: {
    //   type: [String],
    //   default: [],
    //   required: [false, `Must have atleast one day inside availability array`],
    // },
    // timeSlots: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "TimeSlot",
    //   },
    // ],
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
    code:{
      type:String
    },
    image:{
      type:String
    },
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
    amputeeInfo: {
      type: String,
      default: "",
    },
    partialWeightBearing: {
      type: Boolean,
      default: false,
    },
    partialWeightBearingR: {
      type: Boolean,
      default: false,
    },
    partialWeightBearingL: {
      type: Boolean,
      default: false,
    },
    normalWeightBearing: {
      type: Boolean,
      default: false,
    },
    normalWeightBearingR: {
      type: Boolean,
      default: false,
    },
    normalWeightBearingL: {
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
    bath_tubShowerEveryVisit: {
      type: Boolean,
      default: false,
    },
    bath_tubShowerWeekly: {
      type: Boolean,
      default: false,
    },
    bath_bedBathPartial: {
      type: Boolean,
      default: false,
    },
    bath_bedBathComplete: {
      type: Boolean,
      default: false,
    },
    bath_bedBathEveryVisit: {
      type: Boolean,
      default: false,
    },
    bath_bedBathWeekly: {
      type: Boolean,
      default: false,
    },
    bath_assistBathChairEveryVisit: {
      type: Boolean,
      default: false,
    },
    bath_assistBathChairWeekly: {
      type: Boolean,
      default: false,
    },
    bathOtherInfo: {
      type: String,
      default: "",
    },
    personalCareEveryVisit: {
      type: Boolean,
      default: false,
    },
    personalCareWeekly: {
      type: Boolean,
      default: false,
    },
    personalCare_assistWithDressingEveryVisit: {
      type: Boolean,
      default: false,
    },
    personalCare_assistWithDressingWeekly: {
      type: Boolean,
      default: false,
    },
    personalCare_groomHairEveryVisit: {
      type: Boolean,
      default: false,
    },
    personalCare_groomHairWeekly: {
      type: Boolean,
      default: false,
    },
    personalCare_shampooEveryVisit: {
      type: Boolean,
      default: false,
    },
    personalCare_shampooWeekly: {
      type: Boolean,
      default: false,
    },
    personalCare_skinCareEveryVisit: {
      type: Boolean,
      default: false,
    },
    personalCare_skinCareWeekly: {
      type: Boolean,
      default: false,
    },
    personalCare_teethCareEveryVisit: {
      type: Boolean,
      default: false,
    },
    personalCare_teethCareWeekly: {
      type: Boolean,
      default: false,
    },
    personalCare_otherEveryVisit: {
      type: Boolean,
      default: false,
    },
    personalCare_otherWeekly: {
      type: Boolean,
      default: false,
    },
    personalCare_otherInfo: {
      type: String,
      default: "",
    },
    procedures_toiletingAssistEveryVisit: {
      type: Boolean,
      default: false,
    },
    procedures_toiletingAssistWeekly: {
      type: Boolean,
      default: false,
    },
    procedures_catheterCareEveryVisit: {
      type: Boolean,
      default: false,
    },
    procedures_catheterCareWeekly: {
      type: Boolean,
      default: false,
    },
    procedures_ostomyCareEveryVisit: {
      type: Boolean,
      default: false,
    },
    procedures_ostomyCareWeekly: {
      type: Boolean,
      default: false,
    },
    procedures_medicationReminderEveryVisit: {
      type: Boolean,
      default: false,
    },
    procedures_medicationReminderWeekly: {
      type: Boolean,
      default: false,
    },
    procedures_otherEveryVisit: {
      type: Boolean,
      default: false,
    },
    procedures_otherWeekly: {
      type: Boolean,
      default: false,
    },
    procedures_otherInfo: {
      type: String,
      default: "",
    },
    activity_assistWithAmbulation: {
      type: Boolean,
      default: false,
    },
    activity_assistWithWheelChair: {
      type: Boolean,
      default: false,
    },
    activity_assistWithWalker: {
      type: Boolean,
      default: false,
    },
    activity_assistWithCane: {
      type: Boolean,
      default: false,
    },
    activity_assistWithEveryVisit: {
      type: Boolean,
      default: false,
    },
    activity_assistWithWeekly: {
      type: Boolean,
      default: false,
    },
    activity_mobilityAssistChair: {
      type: Boolean,
      default: false,
    },
    activity_mobilityAssistBed: {
      type: Boolean,
      default: false,
    },
    activity_mobilityAssistShower: {
      type: Boolean,
      default: false,
    },
    activity_mobilityAssistTub: {
      type: Boolean,
      default: false,
    },
    activity_mobilityAssistEveryVisit: {
      type: Boolean,
      default: false,
    },
    activity_mobilityAssistWeekly: {
      type: Boolean,
      default: false,
    },
    activity_exercisePerPTOT: {
      type: Boolean,
      default: false,
    },
    activity_exercisePerCarePlan: {
      type: Boolean,
      default: false,
    },
    activity_exerciseEveryVisit: {
      type: Boolean,
      default: false,
    },
    activity_exerciseWeekly: {
      type: Boolean,
      default: false,
    },
    activity_otherEveryVisit: {
      type: Boolean,
      default: false,
    },
    activity_otherWeekly: {
      type: Boolean,
      default: false,
    },
    activity_otherInfo: {
      type: String,
      default: "",
    },
    nutrition_mealPreparationEveryVisit: {
      type: Boolean,
      default: false,
    },
    nutrition_mealPreparationWeekly: {
      type: Boolean,
      default: false,
    },
    nutrition_assistWithFeedingEveryVisit: {
      type: Boolean,
      default: false,
    },
    nutrition_assistWithFeedingWeekly: {
      type: Boolean,
      default: false,
    },
    nutrition_limitFluid: {
      type: Boolean,
      default: false,
    },
    nutrition_encourageFluid: {
      type: Boolean,
      default: false,
    },
    nutrition_fluidEveryVisit: {
      type: Boolean,
      default: false,
    },
    nutrition_fluidWeekly: {
      type: Boolean,
      default: false,
    },
    nutrition_groceryShoppingEveryVisit: {
      type: Boolean,
      default: false,
    },
    nutrition_groceryShoppingWeekly: {
      type: Boolean,
      default: false,
    },
    nutrition_otherEveryVisit: {
      type: Boolean,
      default: false,
    },
    nutrition_otherWeekly: {
      type: Boolean,
      default: false,
    },
    nutrition_otherInfo: {
      type: String,
      default: "",
    },
    other_laundryEveryVisit: {
      type: Boolean,
      default: false,
    },
    other_laundryWeekly: {
      type: Boolean,
      default: false,
    },
    other_bedroomKeeping: {
      type: Boolean,
      default: false,
    },
    other_bathroomKeeping: {
      type: Boolean,
      default: false,
    },
    other_kitchenKeeping: {
      type: Boolean,
      default: false,
    },
    other_bedLinenKeeping: {
      type: Boolean,
      default: false,
    },
    other_houseKeepingEveryVisit: {
      type: Boolean,
      default: false,
    },
    other_houseKeepingWeekly: {
      type: Boolean,
      default: false,
    },
    other_equipmentCareEveryVisit: {
      type: Boolean,
      default: false,
    },
    other_equipmentCareWeekly: {
      type: Boolean,
      default: false,
    },
    other_transportationEveryVisit: {
      type: Boolean,
      default: false,
    },
    other_transportationWeekly: {
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

module.exports = mongoose.model("Patient", PatientSchema);

