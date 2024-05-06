import { ObjectId } from 'mongodb';
import { connectDB } from '../db/connect.js';

export const getAllEmployees = async (req, res) => {
    const { client, db } = await connectDB();
    if (!client) {
        console.error("Failed to connect to database");
        res.status(500).json({ message: 'Failed to connect to database.' });
        return;
    }
    try {
        const employees = await db.collection('employees').find({}).toArray();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get employees.', error: err.message });
    } finally {
        if (client) {
            await client.close();  // Ensure the client is closed correctly
        }
    }
};

export const createEmployee = async (req, res) => {
    const { client, db } = await connectDB();
    if (!client) {
        console.error("Failed to connect to database");
        res.status(500).json({ message: 'Failed to connect to database.' });
        return;
    }
    const { name, title, email, extension, dateHired, currentlyEmployed } = req.body;
    try {
        const newEmployee = {
            name, title, email, extension,
            dateHired: new Date(dateHired),
            currentlyEmployed
        };
        const result = await db.collection('employees').insertOne(newEmployee);
        res.status(201).json(result.ops[0]);
    } catch (err) {
        res.status(500).json({ message: "Failed to create employee.", error: err.message });
    } finally {
        if (client) {
            await client.close();
        }
    }
};

export const getEmployee = async (req, res) => {
    const { client, db } = await connectDB();
    if (!client) {
        console.error("Failed to connect to database");
        res.status(500).send('Failed to connect to database');
        return;
    }
    const { id } = req.params;
    try {
        const employee = await db.collection('employees').findOne({ _id: new ObjectId(id) });
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).send('Error retrieving employee');
    } finally {
        if (client) {
            await client.close();
        }
    }
};

export const updateEmployee = async (req, res) => {
    const { client, db } = await connectDB();
    if (!client) {
        console.error("Failed to connect to database");
        res.status(500).send('Failed to connect to database');
        return;
    }
    const { id } = req.params;
    try {
        const updated = await db.collection('employees').updateOne({ _id: new ObjectId(id) }, { $set: req.body });
        if (updated.modifiedCount === 0) {
            return res.status(404).send('No updates made or employee not found');
        }
        res.status(200).send('Employee updated successfully');
    } catch (err) {
        res.status(500).send('Failed to update employee');
    } finally {
        if (client) {
            await client.close();
        }
    }
};

export const deleteEmployee = async (req, res) => {
    const { client, db } = await connectDB();
    if (!client) {
        console.error("Failed to connect to database");
        res.status(500).send('Failed to connect to database');
        return;
    }
    const { id } = req.params;
    console.log("Trying to delete employee with ID:", id); // Log the ID received

    try {
        const result = await db.collection('employees').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            console.log("No employee found with ID:", id);
            return res.status(404).send('Employee not found');
        }
        console.log("Deleted employee with ID:", id);
        res.status(204).send();
    } catch (err) {
        console.error('Failed to delete employee:', err);
        res.status(500).send('Failed to delete employee');
    } finally {
        if (client) {
            await client.close();
        }
    }
};
