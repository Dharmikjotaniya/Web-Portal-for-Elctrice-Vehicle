const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ReplyComplaint(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("complaint");

        const complaintId = req.params.id;
        const { complaint_admin_reply, complaint_status } = req.body;

        if (!ObjectId.isValid(complaintId)) {
            return res.status(400).json({ success: false, message: "Invalid complaint ID!" });
        }

        if (!complaint_admin_reply) {
            return res.status(400).json({ success: false, message: "Reply is required!" });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(complaintId) },
            {
                $set: {
                    complaint_admin_reply,
                    complaint_status: complaint_status || "resolved",
                    complaint_resolved_at: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Complaint not found!" });
        }

        return res.status(200).json({ success: true, message: "Reply sent successfully!" });

    } catch (error) {
        console.error("ReplyComplaint.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ReplyComplaint };
