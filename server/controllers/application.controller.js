import Application from "../models/application.model.js";
import Job from "../models/job.model.js";


export const submitApplication = async (req, res) => {
    const { jobId, firstName, lastName, email, phone, coverLetter } = req.body;
    const { path: resume } = req.file;

    const job = await Job.findOne({ _id: jobId, isActive: true });

    if (!job) {
        res.status(400);
        throw new Error('Invalid job ID or job is no longer available');
    }

    if (!req.file) {
        res.status(400);
        throw new Error('Please upload a resume');
    }

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