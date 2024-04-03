const asyncHandler = require("express-async-handler");
const Patient = require("../models/PatientModel");

// Get all patients
const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({})
  // .populate("days.sunday")
  //   .populate("days.monday")
  //   .populate("days.tuesday")
  //   .populate("days.wednesday")
  //   .populate("days.thursday")
  //   .populate("days.friday")
  //   .populate("days.saturday")
    .populate('programs');
  res.status(200).json(patients);
});


//Get all patinets with pagination
// const getPatients = asyncHandler(async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;

//     const skip = (page - 1) * limit;

//     const patients = await Patient.find({}).skip(skip).limit(limit);

//     res.status(200).json({
//       patients,
//       currentPage: page,
//       totalPages: Math.ceil(await Patient.countDocuments({}) / limit),
//     });
//   } catch (error) {
//     console.error("Error while fetching patients:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Get patient by Id
// const getPatientById = asyncHandler(async (req, res) => {
//   const patientId = req.params.id;

//   const patient = await Patient.findById(patientId);

//   if (!patient) {
//     res.status(404).json({ error: "Patient not found" });
//   } else {
//     res.status(200).json(patient);
//   }
// });

// const getPatientById = asyncHandler(async (req, res) => {
//   const patientId = req.params.id;

//   const patient = await Patient.findById(patientId)
// .select({
//   _id: 1,
//   patient_name: 1,
//   ss: 1,
//   mcr: 1,
//   mcd: 1,
//   specialRequest: 1,
//   dob: 1,
//   city: 1,
//   state: 1,
//   zip: 1,
//   phoneNumber: 1,
//   address: 1,
//   relativeNameFirst: 1,
//   relativeContactFirst: 1,
//   caseMgrName: 1,
//   caseMgrPhone: 1,
//   caseMgrEmail: 1,
//   doctorName: 1,
//   npi: 1,
//   doctorPhone: 1,
//   doctorAddress: 1,
//   doctorCity: 1,
//   doctorState: 1,
//   doctorZip: 1,
//   // daysNeeded: 1,
//   // timeSlots: 1,
//   programs: 1,
//   code: 1,
//   image: 1,
//   days:1,
//     })
//     .populate('days')
//     // .populate('timeSlots') // Assuming 'timeSlots' is the correct field name in your Patient model
//     // .populate('programs'); // Assuming 'programs' is the correct field name in your Patient model

//   if (!patient) {
//     res.status(404).json({ error: "Patient not found" });
//   } else {
//     res.status(200).json(patient);
//   }
// });


const getPatientById = asyncHandler(async (req, res) => {
  const patientId = req.params.id;

  const patient = await Patient.findById(patientId)
    .select({
      _id: 1,
      patient_name: 1,
      ss: 1,
      mcr: 1,
      mcd: 1,
      specialRequest: 1,
      dob: 1,
      city: 1,
      state: 1,
      zip: 1,
      phoneNumber: 1,
      address: 1,
      relativeNameFirst: 1,
      relativeContactFirst: 1,
      caseMgrName: 1,
      caseMgrPhone: 1,
      caseMgrEmail: 1,
      doctorName: 1,
      npi: 1,
      doctorPhone: 1,
      doctorAddress: 1,
      doctorCity: 1,
      doctorState: 1,
      doctorZip: 1,
      programs: 1,
      code: 1,
      image: 1,
      days: 1,
    })
    .populate("days.sunday")
    .populate("days.monday")
    .populate("days.tuesday")
    .populate("days.wednesday")
    .populate("days.thursday")
    .populate("days.friday")
    .populate("days.saturday")
    .populate('programs')
  // Note: If you have other fields to populate like 'programs', you can add them in a similar manner.

  if (!patient) {
    res.status(404).json({ error: "Patient not found" });
  } else {
    res.status(200).json(patient);
  }
});

// CREATE a new patient
const createPatient = async (req, res) => {
  try {
    const {
      patient_name,
      ss,
      mcr,
      mcd,
      specialRequest,
      dob,
      city,
      state,
      zip,
      phoneNumber,
      address,
      relativeNameFirst,
      relativeContactFirst,
      caseMgrName,
      caseMgrPhone,
      caseMgrEmail,
      doctorName,
      npi,
      doctorPhone,
      doctorAddress,
      doctorCity,
      doctorState,
      doctorZip,
      // daysNeeded,
      // timeSlots,
      days,
      programs,
      image,
      liveAlone,
      liveWithOther,
      aloneDuringDay,
      bedBound,
      bedRest,
      upAsTolerated,
      amputee,
      amputeeInfo,
      partialWeightBearing,
      partialWeightBearingR,
      partialWeightBearingL,
      normalWeightBearing,
      normalWeightBearingR,
      normalWeightBearingL,
      fallPrecautions,
      speechDeficit,
      visionDeficit,
      glasses,
      contacts,
      visionOther,
      hearingDeficit,
      hearingAid,
      dentures,
      upper,
      lower,
      partial,
      forgetfull,
      urinaryCatheter,
      prosthesis,
      prosthesisInfo,
      allergies,
      allergiesInfo,
      diabetic,
      doNotCutNails,
      diet,
      dietInfo,
      seizurePrecaution,
      proneToFactures,
      precautionOther,
      bath_tubShowerEveryVisit,
      bath_tubShowerWeekly,
      bath_bedBathPartial,
      bath_bedBathComplete,
      bath_bedBathEveryVisit,
      bath_bedBathWeekly,
      bath_assistBathChairEveryVisit,
      bath_assistBathChairWeekly,
      bathOtherInfo,
      personalCareEveryVisit,
      personalCareWeekly,
      personalCare_assistWithDressingEveryVisit,
      personalCare_assistWithDressingWeekly,
      personalCare_groomHairEveryVisit,
      personalCare_groomHairWeekly,
      personalCare_shampooEveryVisit,
      personalCare_shampooWeekly,
      personalCare_skinCareEveryVisit,
      personalCare_skinCareWeekly,
      personalCare_teethCareEveryVisit,
      personalCare_teethCareWeekly,
      personalCare_otherEveryVisit,
      personalCare_otherWeekly,
      personalCare_otherInfo,
      procedures_toiletingAssistEveryVisit,
      procedures_toiletingAssistWeekly,
      procedures_catheterCareEveryVisit,
      procedures_catheterCareWeekly,
      procedures_ostomyCareEveryVisit,
      procedures_ostomyCareWeekly,
      procedures_medicationReminderEveryVisit,
      procedures_medicationReminderWeekly,
      procedures_otherEveryVisit,
      procedures_otherWeekly,
      procedures_otherInfo,
      activity_assistWithAmbulation,
      activity_assistWithWheelChair,
      activity_assistWithWalker,
      activity_assistWithCane,
      activity_assistWithEveryVisit,
      activity_assistWithWeekly,
      activity_mobilityAssistChair,
      activity_mobilityAssistBed,
      activity_mobilityAssistShower,
      activity_mobilityAssistTub,
      activity_mobilityAssistEveryVisit,
      activity_mobilityAssistWeekly,
      activity_exercisePerPTOT,
      activity_exercisePerCarePlan,
      activity_exerciseEveryVisit,
      activity_exerciseWeekly,
      activity_otherEveryVisit,
      activity_otherWeekly,
      activity_otherInfo,
      nutrition_mealPreparationEveryVisit,
      nutrition_mealPreparationWeekly,
      nutrition_assistWithFeedingEveryVisit,
      nutrition_assistWithFeedingWeekly,
      nutrition_limitFluid,
      nutrition_encourageFluid,
      nutrition_fluidEveryVisit,
      nutrition_fluidWeekly,
      nutrition_groceryShoppingEveryVisit,
      nutrition_groceryShoppingWeekly,
      nutrition_otherEveryVisit,
      nutrition_otherWeekly,
      nutrition_otherInfo,
      other_laundryEveryVisit,
      other_laundryWeekly,
      other_bedroomKeeping,
      other_bathroomKeeping,
      other_kitchenKeeping,
      other_bedLinenKeeping,
      other_houseKeepingEveryVisit,
      other_houseKeepingWeekly,
      other_equipmentCareEveryVisit,
      other_equipmentCareWeekly,
      other_transportationEveryVisit,
      other_transportationWeekly,
      other_otherInfo,
      // ... include other fields as needed
    } = req.body;

    // Generate code based on the provided information
    const code = generatePatientCode(patient_name, address, zip);

    const newPatient = new Patient({
      days,
      patient_name,
      ss,
      mcr,
      mcd,
      specialRequest,
      dob,
      city,
      state,
      zip,
      code,
      phoneNumber,
      address,
      relativeNameFirst,
      relativeContactFirst,
      caseMgrName,
      caseMgrPhone,
      caseMgrEmail,
      doctorName,
      npi,
      doctorPhone,
      doctorAddress,
      doctorCity,
      doctorState,
      doctorZip,
      days,
      // daysNeeded,
      // timeSlots,
      programs,
      image,
      liveAlone,
      liveWithOther,
      aloneDuringDay,
      bedBound,
      bedRest,
      upAsTolerated,
      amputee,
      amputeeInfo,
      partialWeightBearing,
      partialWeightBearingR,
      partialWeightBearingL,
      normalWeightBearing,
      normalWeightBearingR,
      normalWeightBearingL,
      fallPrecautions,
      speechDeficit,
      visionDeficit,
      glasses,
      contacts,
      visionOther,
      hearingDeficit,
      hearingAid,
      dentures,
      upper,
      lower,
      partial,
      forgetfull,
      urinaryCatheter,
      prosthesis,
      prosthesisInfo,
      allergies,
      allergiesInfo,
      diabetic,
      doNotCutNails,
      diet,
      dietInfo,
      seizurePrecaution,
      proneToFactures,
      precautionOther,
      bath_tubShowerEveryVisit,
      bath_tubShowerWeekly,
      bath_bedBathPartial,
      bath_bedBathComplete,
      bath_bedBathEveryVisit,
      bath_bedBathWeekly,
      bath_assistBathChairEveryVisit,
      bath_assistBathChairWeekly,
      bathOtherInfo,
      personalCareEveryVisit,
      personalCareWeekly,
      personalCare_assistWithDressingEveryVisit,
      personalCare_assistWithDressingWeekly,
      personalCare_groomHairEveryVisit,
      personalCare_groomHairWeekly,
      personalCare_shampooEveryVisit,
      personalCare_shampooWeekly,
      personalCare_skinCareEveryVisit,
      personalCare_skinCareWeekly,
      personalCare_teethCareEveryVisit,
      personalCare_teethCareWeekly,
      personalCare_otherEveryVisit,
      personalCare_otherWeekly,
      personalCare_otherInfo,
      procedures_toiletingAssistEveryVisit,
      procedures_toiletingAssistWeekly,
      procedures_catheterCareEveryVisit,
      procedures_catheterCareWeekly,
      procedures_ostomyCareEveryVisit,
      procedures_ostomyCareWeekly,
      procedures_medicationReminderEveryVisit,
      procedures_medicationReminderWeekly,
      procedures_otherEveryVisit,
      procedures_otherWeekly,
      procedures_otherInfo,
      activity_assistWithAmbulation,
      activity_assistWithWheelChair,
      activity_assistWithWalker,
      activity_assistWithCane,
      activity_assistWithEveryVisit,
      activity_assistWithWeekly,
      activity_mobilityAssistChair,
      activity_mobilityAssistBed,
      activity_mobilityAssistShower,
      activity_mobilityAssistTub,
      activity_mobilityAssistEveryVisit,
      activity_mobilityAssistWeekly,
      activity_exercisePerPTOT,
      activity_exercisePerCarePlan,
      activity_exerciseEveryVisit,
      activity_exerciseWeekly,
      activity_otherEveryVisit,
      activity_otherWeekly,
      activity_otherInfo,
      nutrition_mealPreparationEveryVisit,
      nutrition_mealPreparationWeekly,
      nutrition_assistWithFeedingEveryVisit,
      nutrition_assistWithFeedingWeekly,
      nutrition_limitFluid,
      nutrition_encourageFluid,
      nutrition_fluidEveryVisit,
      nutrition_fluidWeekly,
      nutrition_groceryShoppingEveryVisit,
      nutrition_groceryShoppingWeekly,
      nutrition_otherEveryVisit,
      nutrition_otherWeekly,
      nutrition_otherInfo,
      other_laundryEveryVisit,
      other_laundryWeekly,
      other_bedroomKeeping,
      other_bathroomKeeping,
      other_kitchenKeeping,
      other_bedLinenKeeping,
      other_houseKeepingEveryVisit,
      other_houseKeepingWeekly,
      other_equipmentCareEveryVisit,
      other_equipmentCareWeekly,
      other_transportationEveryVisit,
      other_transportationWeekly,
      other_otherInfo,
      // ... include other fields as needed
    });

    // Check if phoneNumber is already in use
    // const existingContactNo = await Patient.findOne({ phoneNumber });
    // if (existingContactNo) {
    //   res.status(422).json({ error: "Contact Number already in use" });
    //   return;
    // }

    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to generate the patient code
const generatePatientCode = (patientName, address, zip) => {
  // Get initials of patient name
  const initials = patientName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  // Get the first 4 characters of the address
  const addressInitials = address.replace(/\s+/g, "").slice(0, 4).toUpperCase();

  // Get the zipcode
  const zipcode = zip;

  // Concatenate the parts to form the code
  const code = `${initials}${addressInitials}${zipcode}`;

  return code;
};

// UPDATE a patient by ID
const updatePatientInfo = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Update the patient document with the new values from req.body
    for (const [key, value] of Object.entries(req.body)) {
      patient[key] = value;
    }

    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Delete patient by ID
const deletePatient = asyncHandler(async (req, res) => {
  const patientId = req.params.id;

  const patient = await Patient.findById(patientId);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  await Patient.deleteOne({ _id: patientId });

  res.status(200).json({
    message: `Patient deleted successfully`,
  });
});

module.exports = {
  getPatients,
  createPatient,
  deletePatient,
  getPatientById,
  updatePatientInfo,
};
