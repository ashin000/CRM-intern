const Company = require('../models/Company');
const Lead = require('../models/Lead');

// @route   POST /api/companies
// @desc    Create a new company
// @access  Private
exports.createCompany = async (req, res, next) => {
  try {
    const { name, industry, location, description } = req.body;

    if (!name || !industry || !location) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const company = await Company.create({
      name,
      industry,
      location,
      description,
    });

    res.status(201).json({
      success: true,
      company,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/companies
// @desc    Get all companies
// @access  Private
exports.getCompanies = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const companies = await Company.find()
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Company.countDocuments();

    res.status(200).json({
      success: true,
      count: companies.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      companies,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/companies/:id
// @desc    Get company detail with associated leads
// @access  Private
exports.getCompanyDetail = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    // Get associated leads
    const leads = await Lead.find({ company: req.params.id, isDeleted: false })
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      company,
      leads,
      leadCount: leads.length,
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/companies/:id
// @desc    Update company
// @access  Private
exports.updateCompany = async (req, res, next) => {
  try {
    let company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/companies/:id
// @desc    Delete company
// @access  Private
exports.deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Company deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
