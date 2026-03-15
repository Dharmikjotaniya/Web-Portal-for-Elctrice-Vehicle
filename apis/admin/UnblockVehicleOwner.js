const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function UnblockVehicleOwner(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");

        const ownerId = req.params.id;

        if (!ObjectId.isValid(ownerId)) {
            return res.status(400).json({ success: false, message: "Invalid owner ID!" });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(ownerId), user_role: "Owner" },
            { $set: { user_status: "Active" } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Owner not found!" });
        }

        return res.status(200).json({ success: true, message: "Vehicle owner unblocked successfully!" });

    } catch (error) {
        console.error("UnblockVehicleOwner.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { UnblockVehicleOwner };
