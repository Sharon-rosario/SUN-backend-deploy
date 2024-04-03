const express = require("express");
const router = express.Router();
const {
  getLocations,
  createLocation,
  deleteLocation,
  updateLocationName,
  getLocationById,
  addUnitsToLocation,
  removeUnitsFromLocation,
} = require("../controllers/LocationController");

router.route("/").get(getLocations).post(createLocation);
router
  .route("/:id")
  .get(getLocationById)
  .put(updateLocationName)
  .delete(deleteLocation);
router
  .route("/:locationId/units")
  .post(addUnitsToLocation)
  .delete(removeUnitsFromLocation);

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get all locations
 *     tags: 
 *       - Locations
 *     responses:
 *       200:
 *         description: List of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *   post:
 *     summary: Create a new location
 *     tags: 
 *       - Locations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocationRequest'
 *     responses:
 *       200:
 *         description: Location created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */

/**
 * @swagger
 * /api/locations/{id}:
 *   get:
 *     summary: Get location by ID
 *     tags: 
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 *   put:
 *     summary: Update location name
 *     tags: 
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Location ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocationNameUpdate'
 *     responses:
 *       200:
 *         description: Location name updated successfully
 *       404:
 *         description: Location not found
 *   delete:
 *     summary: Delete location by ID
 *     tags: 
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
 */

/**
 * @swagger
 * /api/locations/{locationId}/units:
 *   post:
 *     summary: Add units to location
 *     tags: 
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Location ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UnitsRequest'
 *     responses:
 *       200:
 *         description: Units added to location successfully
 *       404:
 *         description: Location not found
 *   delete:
 *     summary: Remove units from location
 *     tags: 
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Units removed from location successfully
 *       404:
 *         description: Location not found
 */

module.exports = router;
