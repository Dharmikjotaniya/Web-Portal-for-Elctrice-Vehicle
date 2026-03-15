const { connectDb } = require("../../db/dbConnect");

async function ViewAllPayments(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("payment");

        const payments = await collection.find({}).toArray();

        return res.status(200).json({ success: true, data: payments });

    } catch (error) {
        console.error("ViewAllPayments.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewAllPayments };
