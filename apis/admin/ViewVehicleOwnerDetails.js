const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewVehicleOwnerDetails(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");

        const ownerId = req.params.id;

        if (!ObjectId.isValid(ownerId)) {
            return res.status(400).json({ success: false, message: "Invalid owner ID!" });
        }

        const owner = await collection.findOne({ _id: new ObjectId(ownerId), user_role: "Owner" });

        if (!owner) {
            return res.status(404).json({ success: false, message: "Owner not found!" });
        }

        return res.status(200).json({ success: true, data: owner });

    } catch (error) {
        console.error("ViewVehicleOwnerDetails.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewVehicleOwnerDetails };
