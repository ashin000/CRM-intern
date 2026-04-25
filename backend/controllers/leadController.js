const Lead = require('../models/Lead');

// @route   POST /api/leads
// @desc    Create a new lead
// @access  Private
exports.createLead = async (req, res, next) => {
  try {
    const { name, email, phone, status, company } = req.body;

    if (!name || !email || !phone || !company) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      status: status || 'New',
      company,
      assignedTo: req.user.id,
    });

    res.status(201).json({
      success: true,
      lead: await lead.populate('assignedTo company'),
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/leads
// @desc    Get all leads with pagination, search, and filter
// @access  Private
exports.getLeads = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;

    const query = { isDeleted: false };

    // Search by name or email using regex
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const leads = await Lead.find(query)
      .populate('assignedTo', 'name email')
      .populate('company', 'name industry location')
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      success: true,
      count: leads.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      leads,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/leads/:id
// @desc    Get lead by id
// @access  Private
exports.getLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, isDeleted: false })
      .populate('assignedTo', 'name email')
      .populate('company');

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/leads/:id
// @desc    Update lead
// @access  Private
exports.updateLead = async (req, res, next) => {
  try {
    let lead = await Lead.findOne({ _id: req.params.id, isDeleted: false });

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    // Update fields
    lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('assignedTo', 'name email')
      .populate('company');

    res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/leads/:id
// @desc    Soft delete lead
// @access  Private
exports.deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
