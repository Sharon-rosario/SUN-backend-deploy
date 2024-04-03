const express = require("express");
const router = express.Router();
const {
  getUnits,
  createUnit,
  deleteUnit,
  updateUnitName,
  getUnitById,
  addProgramsToLocation,
  updateUnit
} = require("../controllers/UnitController");

router.route("/").get(getUnits).post(createUnit);
router.route("/:id").get(getUnitById).delete(deleteUnit).put(updateUnit);
router
  .route("/:unitId/programs")
  .post(addProgramsToLocation)


  /**
 * @swagger
 * /api/units:
 *   get:
 *     summary: Get all units
 *     tags: 
 *       - Units
 *     responses:
 *       200:
 *         description: List of units
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Unit'
 *   post:
 *     summary: Create a new unit
 *     tags: 
 *       - Units
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UnitRequest'
 *     responses:
 *       200:
 *         description: Unit created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 */

/**
 * @swagger
 * /api/units/{id}:
 *   get:
 *     summary: Get unit by ID
 *     tags: 
 *       - Units
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unit ID
 *     responses:
 *       200:
 *         description: Unit found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unit'
 *       404:
 *         description: Unit not found
 *   put:
 *     summary: Update unit name
 *     tags: 
 *       - Units
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UnitNameUpdate'
 *     responses:
 *       200:
 *         description: Unit name updated successfully
 *       404:
 *         description: Unit not found
 *   delete:
 *     summary: Delete unit by ID
 *     tags: 
 *       - Units
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unit ID
 *     responses:
 *       200:
 *         description: Unit deleted successfully
 *       404:
 *         description: Unit not found
 */

/**
 * @swagger
 * /api/units/{unitId}/programs:
 *   post:
 *     summary: Add programs to unit
 *     tags: 
 *       - Units
 *     parameters:
 *       - in: path
 *         name: unitId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgramsRequest'
 *     responses:
 *       200:
 *         description: Programs added to unit successfully
 *       404:
 *         description: Unit not found
 */

module.exports = router;
