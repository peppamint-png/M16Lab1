import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://student:mongodb@sandbox.y6sn8cp.mongodb.net/?retryWrites=true&w=majority&appName=Sandbox';
let client;
let dbConnectionPromise;

export const connectDB = async () => {
    if (dbConnectionPromise) {
        return dbConnectionPromise;
    }

    client = new MongoClient(uri);
    dbConnectionPromise = client.connect()
        .then(() => {
            console.log("Database connection established");
            return client.db('sample_employees'); // Adjust to your database name
        })
        .catch(err => {
            console.error("Failed to connect to MongoDB", err);
            throw err;
        });

    return dbConnectionPromise;
};
