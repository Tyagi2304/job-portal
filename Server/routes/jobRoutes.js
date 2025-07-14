import express from 'express'
import { getJobByID, getJobs } from '../controllers/jobController.js';

const router = express.Router()

//route to get all jobs data
router.get('/',getJobs)

//route tp get single job data by id
router.get('/:id', getJobByID)

export default router;