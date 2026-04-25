const Task = require('../models/Task');

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, lead, assignedTo, dueDate, status } = req.body;

    if (!title || !lead || !assignedTo || !dueDate) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const task = await Task.create({
      title,
      description,
      lead,
      assignedTo,
      dueDate,
      status: status || 'Pending',
    });

    res.status(201).json({
      success: true,
      task: await task.populate('lead assignedTo'),
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/tasks
// @desc    Get all tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const tasks = await Task.find(query)
      .populate('lead', 'name email')
      .populate('assignedTo', 'name email')
      .skip(skip)
      .limit(limitNum)
      .sort({ dueDate: 1 });

    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      count: tasks.length,
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/tasks/:id
// @desc    Get task by id
// @access  Private
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('lead')
      .populate('assignedTo');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/tasks/:id
// @desc    Update task (only assigned user can update)
// @access  Private
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Check authorization - only assigned user can update
    if (task.assignedTo.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task',
      });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('lead')
      .populate('assignedTo');

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Check authorization
    if (task.assignedTo.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task',
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
