import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db/connect.js'; // Ensure this path is correct
import routes from './routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.use(express.json());

// Middleware to handle database connection
app.use(async (req, res, next) => {
    const db = await connectDB();
    if (!db) {
        return res.status(500).send('Database connection failed');
    }
    req.db = db; // Attach db to request
    next();
});

app.use(routes);  // Use the routes defined in routes.js

// POST endpoint for adding an employee
app.post('/api/employees', async (req, res) => {
    const employee = req.body;  // Assuming the body contains an employee object
    console.log('Adding new employee:', employee);
    
    try {
        const db = req.db;  // Get the db connection from the request
        const collection = db.collection('employees');
        const result = await collection.insertOne(employee);
        res.status(201).json({ message: "Employee added successfully", employee: result.ops[0] });
    } catch (error) {
        console.error('Failed to add employee:', error);
        res.status(500).json({ message: "Failed to add employee", error: error.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
