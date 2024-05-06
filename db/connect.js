import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://student:mongodb@sandbox.y6sn8cp.mongodb.net/?retryWrites=true&w=majority&appName=Sandbox';

export const connectDB = async () => {
    if (!uri) {
        console.error("MongoDB URI is not set.");
        return null;
    }
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db('sample_employees');
        return { client, db };  // Return both the client and db objects
    } catch (err) {
        console.error("Could not connect to MongoDB", err);
        await client.close();
        return null;
    }
};
