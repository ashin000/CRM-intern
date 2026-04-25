const Lead = require('../models/Lead');
const Task = require('../models/Task');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Total leads
    const totalLeads = await Lead.countDocuments({ isDeleted: false });

    // Qualified leads (Contacted)
    const qualifiedLeads = await Lead.countDocuments({
      isDeleted: false,
      status: 'Contacted',
    });

    // Lost leads
    const lostLeads = await Lead.countDocuments({
      isDeleted: false,
      status: 'Lost',
    });

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Tasks due today
    const tasksDueToday = await Task.countDocuments({
      dueDate: {
        $gte: today,
        $lt: tomorrow,
      },
      status: 'Pending',
    });

    // Completed tasks
    const completedTasks = await Task.countDocuments({
      status: 'Completed',
    });

    // Total tasks
    const totalTasks = await Task.countDocuments();

    // Tasks by status
    const tasksByStatus = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Leads by status
    const leadsByStatus = await Lead.aggregate([
      {
        $match: { isDeleted: false },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalLeads,
        qualifiedLeads,
        lostLeads,
        tasksDueToday,
        completedTasks,
        totalTasks,
        tasksByStatus,
        leadsByStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};
