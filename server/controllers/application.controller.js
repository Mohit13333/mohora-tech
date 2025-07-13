import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import { processUploadedFiles } from '../middlewares/jobaplicaton.middleware.js';

export const submitApplication = async (req, res) => {
  try {
    const { jobId, firstName, lastName, email, phone, coverLetter } = req.body;

    // Ensure resume is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a resume' });
    }

    // Upload resume to Cloudinary
    const uploadResults = await processUploadedFiles(req);
    const resume = uploadResults.resume?.secure_url;

    if (!resume) {
      return res.status(400).json({ success: false, message: 'Resume upload failed' });
    }

    // Check if job exists and is active
    const job = await Job.findOne({ _id: jobId, isActive: true });
    if (!job) {
      return res.status(400).json({ success: false, message: 'Invalid job ID or job is no longer available' });
    }

    // Create application record
    const application = await Application.create({
      jobId,
      firstName,
      lastName,
      email,
      phone,
      coverLetter: coverLetter || '',
      resume
    });

    res.status(201).json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Application Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getJobApplications = async (req, res) => {
    const applications = await Application.find({ jobId: req.params.jobId })
        .sort('-appliedAt')
        .populate('jobId', 'title department');

    res.json({
        success: true,
        count: applications.length,
        data: applications
    });
};

export const getApplication = async (req, res) => {
    const application = await Application.findById(req.params.id).populate('jobId', 'title department');

    if (!application) {
        res.status(404);
        throw new Error('Application not found');
    }

    res.json({
        success: true,
        data: application
    });
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private/Admin
export const updateApplicationStatus = async (req, res) => {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
        res.status(404);
        throw new Error('Application not found');
    }

    application.status = status;
    await application.save();

    res.json({
        success: true,
        data: application
    });
};

export const downloadResume = async (req, res) => {
    const application = await Application.findById(req.params.id);

    if (!application) {
        res.status(404);
        throw new Error('Application not found');
    }

    const filePath = application.resume.path;
    const fileName = application.resume.filename;

    if (!fs.existsSync(filePath)) {
        res.status(404);
        throw new Error('File not found');
    }

    res.download(filePath, fileName);
};