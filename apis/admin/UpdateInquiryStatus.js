const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function UpdateInquiryStatus(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("contact_us");

        const inquiryId = req.params.id;
        const { inquiry_status } = req.body;

        if (!ObjectId.isValid(inquiryId)) {
            return res.status(400).json({ success: false, message: "Invalid inquiry ID!" });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(inquiryId) },
            { $set: { inquiry_status } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Inquiry not found!" });
        }

        return res.status(200).json({ success: true, message: "Inquiry status updated!" });

    } catch (error) {
        console.error("UpdateInquiryStatus.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { UpdateInquiryStatus };
