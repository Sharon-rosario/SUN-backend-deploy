const express = require("express");
const router = express.Router();
const {
    createForm,
    getAllForms,
    getFormById,
    updateForm,
    deleteForm,
    getFormByAssignmentId,
    updateFormByAssignmentId,
    deleteFormByAssignmentId,
} = require("../../controllers/NurseFormsControllers/ConfidentialInfoController");

// this routes will be used in frontend
router.post("/", createForm);
router.get("/", getAllForms);
router.get('/assignment/:assignmentId', getFormByAssignmentId )
router.put("/assignment/:id", updateFormByAssignmentId);
router.delete("/:assignmentId", deleteFormByAssignmentId);

// for postman testing only
router.get("/:id", getFormById);
router.delete("/:id", deleteForm);
// router.put("/:id", updateForm);

module.exports = router;
