const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function UpdateComplaintStatus(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("complaint");

        const complaintId = req.params.id;
        const { complaint_status } = req.body;

        if (!ObjectId.isValid(complaintId)) {
            return res.status(400).json({ success: false, message: "Invalid complaint ID!" });
        }

        if (!complaint_status) {
            return res.status(400).json({ success: false, message: "Status is required!" });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(complaintId) },
            { $set: { complaint_status } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Complaint not found!" });
        }

        return res.status(200).json({ success: true, message: "Complaint status updated!" });

    } catch (error) {
        console.error("UpdateComplaintStatus.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { UpdateComplaintStatus };
