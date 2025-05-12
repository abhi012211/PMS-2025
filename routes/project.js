import express from 'express';
import {createProject, getProjects, getProjectById, updateProject, deleteProject, listProjects} from '../controllers/project.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';
const router = express.Router();
router.use(authenticate);
router.use(authorizeRoles('admin', 'manager'));

router.post(
    '/',
    [body('name').not().isEmpty().withMessage('Name is required')],
    // body('description').not().isEmpty().withMessage('Description is required'),
    // body('startDate').not().isEmpty().withMessage('Start date is required'),
    // body('endDate').not().isEmpty().withMessage('End date is required'),
    validate,
    createProject
);

router.get(
    '/',
    listProjects
);

router.put('/:id',updateProject);
router.delete('/:id',deleteProject);

export default router;