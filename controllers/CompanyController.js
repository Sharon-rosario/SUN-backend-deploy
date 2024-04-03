// companyController.js

const asyncHandler = require('express-async-handler');
const Company = require('../models/CompanyModel'); // Adjust the path based on your structure

// Create a new company
exports.createCompany = asyncHandler(async (req, res) => {
  const { company_name } = req.body;

  const companyExists = await Company.findOne({ company_name });
  if (companyExists) {
    res.status(400);
    throw new Error('Company already exists');
  }

  const company = await Company.create({ company_name });

  if (company) {
    res.status(201).json({
      _id: company.id,
      company_name: company.company_name,
      message: "Successfully created new company"
    });
  } else {
    res.status(400);
    throw new Error('Invalid company data');
  }
});

// Get all companies
exports.getAllCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find({});
  res.json(companies);
});

// Get a single company by ID
exports.getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    res.json(company);
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});

// Update a company
exports.updateCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    company.company_name = req.body.company_name || company.company_name;

    const updatedCompany = await company.save();
    res.json({
      _id: updatedCompany._id,
      company_name: updatedCompany.company_name,
      message:"Company Updated successfully"
    });
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});

// Delete a company
exports.deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    await company.deleteOne({_id: req.params.id});
    // await company.remove();
    res.json({ message: 'Company removed' });
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});
