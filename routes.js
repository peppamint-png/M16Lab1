import express from 'express';
import { getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from './controllers/employeeController.js';

const router = express.Router();

router.use(express.json()); // Middleware to parse JSON bodies

// Employee Routes
router.get('/api/employees', getAllEmployees);
router.get('/api/employees/:id', getEmployee);
router.post('/api/employees', createEmployee);  // Make sure this points to a function that interacts with MongoDB
router.patch('/api/employees/:id', updateEmployee);
router.delete('/api/employees/:id', deleteEmployee);

export default router;
