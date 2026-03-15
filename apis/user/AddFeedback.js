const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function AddFeedback(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("feedback");

        const { user_id, booking_id, feedback_rating, feedback_review } = req.body;

        if (!user_id || !booking_id || !feedback_rating || !feedback_review) {
            return res.status(400).json({ success: false, message: "user_id, booking_id, feedback_rating and feedback_review required!" });
        }

        await collection.insertOne({
            user_id: new ObjectId(user_id),
            booking_id: new ObjectId(booking_id),
            feedback_rating: Number(feedback_rating),
            feedback_review: feedback_review || "",
            created_at: new Date()
        });

        return res.status(201).json({ success: true, message: "Feedback added successfully!" });

    } catch (error) {
        console.error("AddFeedback.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { AddFeedback };
