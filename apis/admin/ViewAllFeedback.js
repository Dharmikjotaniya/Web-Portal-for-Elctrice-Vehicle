const { connectDb } = require("../../db/dbConnect");

async function ViewAllFeedback(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("feedback");

        const feedbacks = await collection.find({}).toArray();

        return res.status(200).json({ success: true, data: feedbacks });

    } catch (error) {
        console.error("ViewAllFeedback.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewAllFeedback };
