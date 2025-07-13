import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const resumeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: 'job-applications/resumes',
      resource_type: 'raw', // Use 'raw' for documents instead of 'image'
      allowed_formats: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
      format: async () => {
        // Preserve original file extension
        const ext = file.originalname.split('.').pop().toLowerCase();
        return ext;
      },
      public_id: `${file.fieldname}-${Date.now()}`,
      // Optional: Add tags for better organization
      tags: ['resume', 'job-application']
    };
  }
});

const additionalDocsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: 'job-applications/additional-docs',
      resource_type: 'raw',
      allowed_formats: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'jpg', 'jpeg', 'png'],
      format: async () => {
        const ext = file.originalname.split('.').pop().toLowerCase();
        return ext;
      },
      public_id: `${file.fieldname}-${Date.now()}`,
      tags: ['additional-document', 'job-application']
    };
  }
});

// Middleware for uploading resumes
export const uploadResume = multer({ 
  storage: resumeStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only one file
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'), false);
    }
  }
});

// Middleware for uploading additional documents
export const uploadAdditionalDocs = multer({
  storage: additionalDocsStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 3 // Maximum 3 files
  }
});

// Combined middleware for multiple upload types
export const uploadApplicationFiles = multer({
  storage: resumeStorage, // Default storage for all files
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
    files: 4 // Resume + 3 additional files max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/rtf',
      'image/jpeg',
      'image/png'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only documents and images are allowed'), false);
    }
  }
}).fields([
  { name: 'resume', maxCount: 1 },
  { name: 'coverLetter', maxCount: 1 },
  { name: 'certificates', maxCount: 2 }
]);