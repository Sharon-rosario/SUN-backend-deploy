const express = require("express");
const router = express.Router();
const {
  getTimeSlots,
  createTimeSlot,
  deleteTimeSlot,
  updateTimeSlotName,
  getTimeSlotById,
} = require("../controllers/TimeSlotController");

router.route("/").get(getTimeSlots).post(createTimeSlot);
router.route("/:id").get(getTimeSlotById).delete(deleteTimeSlot);
router.route("/:id/update").put(updateTimeSlotName);

/**
 * @swagger
 * /api/timeslots:
 *   get:
 *     summary: Get all time slots
 *     tags:
 *       - Time Slots
 *     responses:
 *       200:
 *         description: List of time slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TimeSlot'
 *   post:
 *     summary: Create a new time slot
 *     tags:
 *       - Time Slots
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeSlotRequest'
 *     responses:
 *       200:
 *         description: Time slot created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeSlot'
 */

/**
 * @swagger
 * /api/timeslots/{id}:
 *   get:
 *     summary: Get time slot by ID
 *     tags:
 *       - Time Slots
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Time slot ID
 *     responses:
 *       200:
 *         description: Time slot found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeSlot'
 *       404:
 *         description: Time slot not found
 *   delete:
 *     summary: Delete time slot by ID
 *     tags:
 *       - Time Slots
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Time slot ID
 *     responses:
 *       200:
 *         description: Time slot deleted successfully
 *       404:
 *         description: Time slot not found
 */

/**
 * @swagger
 * /api/timeslots/{id}/update:
 *   put:
 *     summary: Update time slot name
 *     tags:
 *       - Time Slots
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Time slot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeSlotNameUpdate'
 *     responses:
 *       200:
 *         description: Time slot name updated successfully
 *       404:
 *         description: Time slot not found
 */

module.exports = router;
