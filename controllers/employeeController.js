import { ObjectId } from 'mongodb';
import { connectDB } from '../db/connect.js';

// Function to get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const db = await connectDB();
        const employees = await db.collection('employees').find({}).toArray();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error retrieving all employees:', error);
        res.status(500).send('Failed to retrieve employees');
    }
};

// Function to add a new employee
export const createEmployee = async (req, res) => {
    try {
        const db = await connectDB();
        const { name, title, email, extension, dateHired, currentlyEmployed } = req.body;
        const newEmployee = { name, title, email, extension, dateHired: new Date(dateHired), currentlyEmployed };
        const result = await db.collection('employees').insertOne(newEmployee);

        if (!result.acknowledged) {
            throw new Error('Employee insertion failed');
        }

        // Construct the employee object to include the inserted ID
        const employeeWithId = { ...newEmployee, _id: result.insertedId };

        res.status(201).json({ message: "Employee added successfully", employee: employeeWithId });
    } catch (error) {
        console.error('Error adding new employee:', error);
        res.status(500).json({ message: "Failed to add employee", error: error.message });
    }
};

// Function to get a single employee
export const getEmployee = async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;
        const employee = await db.collection('employees').findOne({ _id: new ObjectId(id) });
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error retrieving employee:', error);
        res.status(500).send('Failed to retrieve employee');
    }
};

// Function to update an employee
export const updateEmployee = async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;
        const updateData = req.body;
        const result = await db.collection('employees').updateOne({ _id: new ObjectId(id) }, { $set: updateData });
        if (result.modifiedCount === 0) {
            return res.status(404).send('No updates made or employee not found');
        }
        res.status(200).send('Employee updated successfully');
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).send('Failed to update employee');
    }
};

// Function to delete an employee
export const deleteEmployee = async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;
        const result = await db.collection('employees').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).send('Employee not found');
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).send('Failed to delete employee');
    }
};
