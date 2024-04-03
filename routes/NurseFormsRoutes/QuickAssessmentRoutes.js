const express = require("express");
const router = express.Router();
const quickAssessmentController = require("../../controllers/NurseFormsControllers/QuickAssessmentController");

// Create Quick Assessment
router.post("/", quickAssessmentController.createQuickAssessment);

// Get All Quick Assessments
router.get("/", quickAssessmentController.getAllQuickAssessments);

// Get Quick Assessment by ID
router.get("/:id", quickAssessmentController.getQuickAssessmentById);

// Update Quick Assessment by ID
router.put("/:id", quickAssessmentController.updateQuickAssessment);

// Delete Quick Assessment by ID
router.delete("/:id", quickAssessmentController.deleteQuickAssessment);

// Get Quick Assessment by Assignment ID
router.get("/assignment/:assignmentId", quickAssessmentController.getQuickAssessmentByAssignmentId);

// Update Quick Assessment by Assignment ID
router.put("/assignment/:assignmentId", quickAssessmentController.updateQuickAssessmentByAssignmentId);

// Delete Quick Assessment by Assignment ID
router.delete("/assignment/:assignmentId", quickAssessmentController.deleteQuickAssessmentByAssignmentId);

module.exports = router;
