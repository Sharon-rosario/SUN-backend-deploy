const express = require("express");
const router = express.Router();
const {
  getPrograms,
  createProgram,
  deleteProgram,
  updateProgramName,
  getProgramById
} = require("../controllers/ProgramController");

router.route("/").get(getPrograms).post(createProgram);
router.route("/:id").get(getProgramById).put(updateProgramName).delete(deleteProgram);

/**
 * @swagger
 * /api/programs:
 *   get:
 *     summary: Get all programs
 *     tags: 
 *       - Programs
 *     responses:
 *       200:
 *         description: List of programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Program'
 *   post:
 *     summary: Create a new program
 *     tags: 
 *       - Programs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgramRequest'
 *     responses:
 *       200:
 *         description: Program created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 */

/**
 * @swagger
 * /api/programs/{id}:
 *   get:
 *     summary: Get program by ID
 *     tags: 
 *       - Programs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Program ID
 *     responses:
 *       200:
 *         description: Program found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Program not found
 *   put:
 *     summary: Update program name
 *     tags: 
 *       - Programs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Program ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgramNameUpdate'
 *     responses:
 *       200:
 *         description: Program name updated successfully
 *       404:
 *         description: Program not found
 *   delete:
 *     summary: Delete program by ID
 *     tags: 
 *       - Programs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Program ID
 *     responses:
 *       200:
 *         description: Program deleted successfully
 *       404:
 *         description: Program not found
 */

module.exports = router;
