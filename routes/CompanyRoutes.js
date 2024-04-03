const express = require('express');
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require('../controllers/CompanyController'); // Adjust the path based on your structure

const router = express.Router();

// Create a new company
router.post('/', createCompany);

// Get all companies
router.get('/', getAllCompanies);

// Get a single company by ID
router.get('/:id', getCompanyById);

// Update a company
router.put('/:id', updateCompany);

// Delete a company
router.delete('/:id', deleteCompany);

module.exports = router;