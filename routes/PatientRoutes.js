const express = require("express");
const router = express.Router();
const {
  getPatients,
  createPatient,
  deletePatient,
  updatePatientInfo,
  getPatientById,
} = require("../controllers/PatientController");

router.route("/").get(getPatients).post(createPatient);
router.route("/:id").get(getPatientById).delete(deletePatient);
// router.route("/:patientId/update-info").post(updatePatientInfo);
router.put('/:id', updatePatientInfo);

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     tags:
 *       - Patients
 *     responses:
 *       200:
 *         description: List of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *   post:
 *     summary: Create a new patient
 *     tags:
 *       - Patients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientRequest'
 *     responses:
 *       200:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 */

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 *   delete:
 *     summary: Delete patient by ID
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /api/patients/{patientId}/update-info:
 *   post:
 *     summary: Update patient information
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientUpdateInput'
 *     responses:
 *       200:
 *         description: Patient data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Patient not found
 */

module.exports = router;
