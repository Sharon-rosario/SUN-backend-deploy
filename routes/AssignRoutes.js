const express = require("express");
const router = express.Router();
const {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  // getPersonnelByTimeSlot,
  getFilteredAssignments,
  existingAssignments,
  patientStatus,
  getAssignmentsByEIdAndDate,
} = require("../controllers/AssignController.js");

// POST /api/assignments
router.post("/", createAssignment);

router.post("/patient-status", patientStatus);

router.get("/exist", existingAssignments)

// GET /api/assignments
router.get("/", getAssignments);

// GET filtered date and assignedToModel = /api/assignments
router.get("/category/", getFilteredAssignments);

// for mobile developers mobile view based on employee login
router.get('/employeeAssignments/',getAssignmentsByEIdAndDate)

// GET /api/assignments/:id
router.get("/:id", getAssignmentById);

// PUT /api/assignments/:id
router.put("/:id", updateAssignment);

// DELETE /api/assignments/:id
router.delete("/:id", deleteAssignment);

// router.get('/:role', getPersonnelByTimeSlot);

module.exports = router;

