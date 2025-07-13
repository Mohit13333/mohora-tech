import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import { promisify } from 'util';
import stream from 'stream';

// Create memory storage
const memoryStorage = multer.memoryStorage();

// Function to upload stream to Cloudinary
const uploadToCloudinary = (file, folder, resourceType = 'raw') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: resourceType,
        public_id: `${file.fieldname}-${Date.now()}`,
        tags: ['job-application']
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(uploadStream);
  });
};

// Middleware for uploading resumes
export const uploadResume = multer({ 
  storage: memoryStorage,
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
}).single('resume');

// Middleware for uploading additional documents
export const uploadAdditionalDocs = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 3 // Maximum 3 files
  }
}).array('additionalDocs', 3);

// Combined middleware for multiple upload types
export const uploadApplicationFiles = multer({
  storage: memoryStorage,
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

// Helper function to process uploaded files
export const processUploadedFiles = async (req) => {
  const uploadResults = {};
  
  if (req.file) {
    // Single file upload (like resume)
    const result = await uploadToCloudinary(
      req.file,
      'job-applications/resumes'
    );
    uploadResults[req.file.fieldname] = result;
  } else if (req.files) {
    // Multiple files upload
    for (const field in req.files) {
      if (!uploadResults[field]) {
        uploadResults[field] = [];
      }
      
      const folder = field === 'resume' || field === 'coverLetter' 
        ? 'job-applications/resumes' 
        : 'job-applications/additional-docs';
      
      for (const file of req.files[field]) {
        const result = await uploadToCloudinary(file, folder);
        uploadResults[field].push(result);
      }
    }
  }
  
  return uploadResults;
};