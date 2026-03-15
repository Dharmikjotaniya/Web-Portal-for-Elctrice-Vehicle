const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function AddComplaint(req, res) {
    try {

        const db = await connectDb();
        const collection = db.collection("complaint");

        const { user_id, complaint_subject, complaint_description } = req.body;

        if (!user_id || !complaint_subject || !complaint_description) {
            return res.status(400).json({
                success: false,
                message: "user_id, complaint_subject and complaint_description required!"
            });
        }

        const complaintData = {
            user_id: new ObjectId(user_id),
            complaint_subject,
            complaint_description,
            complaint_status: "Pending",
            complaint_admin_reply: "",
            complaint_resolved_at: null,
            created_at: new Date()
        };

        await collection.insertOne(complaintData);

        return res.status(201).json({
            success: true,
            message: "Complaint submitted successfully!"
        });

    } catch (error) {

        console.error("AddComplaint Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = { AddComplaint };