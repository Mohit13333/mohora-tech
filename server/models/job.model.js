import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        enum: ['Engineering', 'Design', 'Product', 'Infrastructure', 'Marketing', 'HR', 'Finance'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        enum: ['Mumbai', 'Bangalore', 'Delhi', 'Remote', 'Hybrid'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Job type is required'],
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        trim: true
    },
    salary: {
        type: String,
        required: [true, 'Salary information is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Job description is required'],
        trim: true
    },
    requirements: {
        type: [String],
        required: [true, 'Job requirements are required'],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'At least one requirement is required'
        }
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

jobSchema.index({ title: 'text', description: 'text', department: 'text' });

const Job = mongoose.model('Job', jobSchema);

export default Job;