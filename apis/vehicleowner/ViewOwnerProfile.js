const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewOwnerProfile(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");

        const { owner_id } = req.body;

        if (!owner_id || !ObjectId.isValid(owner_id)) {
            return res.status(400).json({ success: false, message: "Valid owner_id required!" });
        }

        const owner = await collection.findOne({ _id: new ObjectId(owner_id), role: "owner" });

        if (!owner) {
            return res.status(404).json({ success: false, message: "Owner not found!" });
        }

        return res.status(200).json({ success: true, data: owner });

    } catch (error) {
        console.error("ViewOwnerProfile.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewOwnerProfile };
