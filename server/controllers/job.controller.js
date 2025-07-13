import Job from "../models/job.model.js";

export const getJobs = async (req, res) => {
  const { department, location, type, search } = req.query;
  
  // Build query object
  const query = { isActive: true };
  
  if (department) query.department = department;
  if (location) query.location = location;
  if (type) query.type = type;
  if (search) query.$text = { $search: search };
  
  const jobs = await Job.find(query).sort('-postedAt');
  
  res.json({
    success: true,
    count: jobs.length,
    data: jobs
  });
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  
  if (!job || !job.isActive) {
    res.status(404);
    throw new Error('Job not found');
  }
  
  res.json({
    success: true,
    data: job
  });
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private/Admin
export const createJob = async (req, res) => {
  const { title, department, location, type, salary, description, requirements } = req.body;
  
  if (!title || !department || !location || !type || !salary || !description || !requirements) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  
  const job = await Job.create({
    title,
    department,
    location,
    type,
    salary,
    description,
    requirements: Array.isArray(requirements) ? requirements : [requirements]
  });
  
  res.status(201).json({
    success: true,
    data: job
  });
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private/Admin
export const updateJob = async (req, res) => {
  let job = await Job.findById(req.params.id);
  
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  
  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.json({
    success: true,
    data: job
  });
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
export const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  
  // Soft delete by setting isActive to false
  job.isActive = false;
  await job.save();
  
  res.json({
    success: true,
    data: {}
  });
};