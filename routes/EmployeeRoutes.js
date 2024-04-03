const express = require("express");
const router = express.Router();
const {
  getEmployees,
  createEmployee,
  getAvailableEmployees,
  fetchEmployees,
  deleteEmployee,
  updateEmployeeInfo,
  getEmployeeById,
  getEmployeeByTimeSlot,
  employeeSignin,
  resetEmployeePassword,
  setEmployeeToggle,
  updateEmployee
} = require("../controllers/EmployeeController");

router.route("/toggle"). post(setEmployeeToggle)
router.get("/fetch", fetchEmployees)
router.get("/available", getAvailableEmployees);
router.get("/by-timeslot", getEmployeeByTimeSlot);
router.route("/").get(getEmployees).post(createEmployee);
router.route("/:id").get(getEmployeeById).delete(deleteEmployee).put(updateEmployee);
router.route("/:employeeId").put(updateEmployeeInfo);
router.post("/signin", employeeSignin);
router.put("/resetPassword", resetEmployeePassword);

/**
 * @swagger
 * /api/nurses:
 *   get:
 *     summary: Get all nurses
 *     tags:
 *       - Nurses
 *     responses:
 *       200:
 *         description: List of nurses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Nurse'
 *   post:
 *     summary: Create a new nurse
 *     tags:
 *       - Nurses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NurseRequest'
 *     responses:
 *       200:
 *         description: Nurse created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nurse'
 */

/**
 * @swagger
 * /api/nurses/{id}:
 *   get:
 *     summary: Get nurse by ID
 *     tags:
 *       - Nurses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Nurse ID
 *     responses:
 *       200:
 *         description: Nurse found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nurse'
 *       404:
 *         description: Nurse not found
 *   delete:
 *     summary: Delete nurse by ID
 *     tags:
 *       - Nurses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Nurse ID
 *     responses:
 *       200:
 *         description: Nurse deleted successfully
 *       404:
 *         description: Nurse not found
 */

/**
 * @swagger
 * /api/nurses/{nurseId}/update-info:
 *   post:
 *     summary: Update nurse information
 *     tags:
 *       - Nurses
 *     parameters:
 *       - in: path
 *         name: nurseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Nurse ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NurseUpdateInput'
 *     responses:
 *       200:
 *         description: Nurse data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Nurse'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Nurse not found
 */

module.exports = router;
