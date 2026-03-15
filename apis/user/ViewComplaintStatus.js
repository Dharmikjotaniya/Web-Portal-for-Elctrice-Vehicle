const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewComplaintStatus(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("complaint");

        const { user_id } = req.body;

        if (!user_id || !ObjectId.isValid(user_id)) {
            return res.status(400).json({ success: false, message: "Valid user_id required!" });
        }

        const complaints = await collection.find({ user_id: new ObjectId(user_id) }).toArray();

        return res.status(200).json({ success: true, data: complaints });

    } catch (error) {
        console.error("ViewComplaintStatus.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewComplaintStatus };
