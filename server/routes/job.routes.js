import { Router } from 'express';
import getFormattedJobs from '../controllers/fetchJobs.controller.js';
import createJob from '../controllers/jobCreate.controller.js';

const router = Router();

router.get('/jobs/formatted', getFormattedJobs);
router.post('/jobs/create', createJob); 

export default router;
