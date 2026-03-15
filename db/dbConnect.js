const { MongoClient } = require("mongodb");
require("dotenv").config();

const connectDb = async () => {
    const dbUrl = process.env.MONGO_URI;

    try {
        const client = await MongoClient.connect(dbUrl);
        console.log("Connected to MongoDB");
        return client.db();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

module.exports = { connectDb };