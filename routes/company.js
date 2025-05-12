import express from 'express';
import { registerCompany } from '../controllers/company';
import { body } from 'express-validator';
import { validate } from '../middleware/validate';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
  ],
  validate,
  registerCompany
);
export default router;