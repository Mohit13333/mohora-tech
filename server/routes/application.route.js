import express from 'express';
import {
  submitApplication,
  getJobApplications,
  getApplication,
  updateApplicationStatus,
  downloadResume
} from '../controllers/application.controller.js';
import { uploadResume } from '../middlewares/jobaplicaton.middleware.js';

const router = express.Router();

router.post('/apply', uploadResume.single('resume'), submitApplication);

router.get('/job/:jobId', getJobApplications);
router.get('/:id', getApplication);
router.put('/:id/status', updateApplicationStatus);
router.get('/:id/resume', downloadResume);

export default router;