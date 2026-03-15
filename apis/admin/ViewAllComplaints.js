const { connectDb } = require("../../db/dbConnect");

async function ViewAllComplaints(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("complaint");

        const complaints = await collection.find({}).toArray();

        return res.status(200).json({ success: true, data: complaints });

    } catch (error) {
        console.error("ViewAllComplaints.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewAllComplaints };
