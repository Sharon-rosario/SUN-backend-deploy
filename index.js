const express = require("express");
const connectDb = require("./config/dbConnection");
require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const swaggerUI = require('swagger-ui-express');
const generateSwaggerSpec = require('./swaggerOptions');
const path = require('path');

connectDb();
const app = express();
const port = process.env.PORT || 9000;
const { swaggerSpec } = generateSwaggerSpec(app);

// app.get('/api/incident-hha/image/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const imagePath = path.join(__dirname, 'uploads', filename);
//   res.sendFile(imagePath);
// });

app.use(cors());
app.use(express.json());
// Place this line of code in your server setup, not inside the route handler.
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use("/api/admin", require("./routes/AdminRoutes.js"))
app.use("/api/locations", require("./routes/LocationRoutes"));
app.use("/api/units", require("./routes/UnitRoutes"));
app.use("/api/programs", require("./routes/ProgramRoutes"));
app.use("/api/timeSlots", require("./routes/TimeSlotRoutes"));
app.use("/api/employee", require("./routes/EmployeeRoutes"));
app.use("/api/patients", require("./routes/PatientRoutes"));
app.use("/api/assign", require("./routes/AssignRoutes"));
app.use("/api/companies", require("./routes/CompanyRoutes"));

//common forms
app.use("/api/schedule-hha", require("./routes/CommonFormsRoutes/ScheduleHHARoutes.js"));
app.use("/api/incident-hha", require("./routes/CommonFormsRoutes/IncidentFormHHARoutes.js"));
app.use("/api/missed-visit-hha", require("./routes/CommonFormsRoutes/MissedVisitHHARoutes.js"));
app.use("/api/daily-time-sheet", require("./routes/CommonFormsRoutes/DailyTimeSheetHHARoutes.js"));

// nurse form routes 
app.use("/api/confidential-info-nurse-form", require('./routes/NurseFormsRoutes/ConfidentialInfoRoutes.js'))
app.use("/api/noticeOfLimitOfScope", require('./routes/NurseFormsRoutes/NoticeOfLimitOfScope.js'))
app.use("/api/clientbillrights", require('./routes/NurseFormsRoutes/ClientBillOfRightsRoutes.js'))
app.use("/api/patientprior", require('./routes/NurseFormsRoutes/PatientPrioritizationRoutes.js'))
app.use("/api/policies", require('./routes/NurseFormsRoutes/PolicyOnConfidentialityRoutes.js'))
app.use('/api/privacy-practices-receipt',require('./routes/NurseFormsRoutes/RecieptOfNoticeRoutes.js'))
app.use("/api/quick-assessment", require('./routes/NurseFormsRoutes/QuickAssessmentRoutes.js'))
app.use('/api/patient-emergency',require('./routes/NurseFormsRoutes/PatientEmergencyRoutes.js'))
app.use('/api/emergency-phonenumber',require('./routes/NurseFormsRoutes/EmergencyPhone.js'))
app.use('/api/home-environment-safety',require('./routes/NurseFormsRoutes/HomeEnvironmentFormRoutes.js'))
app.use('/api/passport-supervisory',require('./routes/NurseFormsRoutes/PassportSupervisoryRoutes.js'))
app.use('/api/nursing-assesment',require('./routes/NurseFormsRoutes/NursingAssesmentRoutes.js'))
app.use('/api/aide-care-plan',require('./routes/NurseFormsRoutes/AideCarePlanRoutes.js'))
app.use('/api/referral-que',require('./routes/NurseFormsRoutes/ReferralQueRoutes.js'))

app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Serve Swagger UI
app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// nurse - suraj(0) and peter(1)
// hha - rusdra(1) and test(0)

// assignment ID that can be used for testing : 65f7eaef275c964eadedc535

// const fieldCount = Object.keys(aideCareSchema.paths).length;
// console.log("Number of fields:", fieldCount);