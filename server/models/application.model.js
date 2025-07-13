import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Job ID is required']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  coverLetter: {
    type: String,
    trim: true
  },
  resume: {
    path: {
      type: String,
      required: [true, 'Resume path is required']
    },
    filename: {
      type: String,
      required: [true, 'Resume filename is required']
    }
  },
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Interviewing', 'Rejected', 'Hired'],
    default: 'Submitted'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;