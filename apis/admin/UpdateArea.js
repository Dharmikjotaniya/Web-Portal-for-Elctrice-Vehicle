const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function UpdateArea(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("area");

        const areaId = req.params.id;
        const { area_name, pincode, area_status } = req.body;

        if (!ObjectId.isValid(areaId)) {
            return res.status(400).json({ success: false, message: "Invalid area ID!" });
        }
 
        const result = await collection.updateOne(
            { _id: new ObjectId(areaId) },
            { $set: { area_name, pincode, area_status } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Area not found!" });
        }

        return res.status(200).json({ success: true, message: "Area updated successfully!" });

    } catch (error) {
        console.error("UpdateArea.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { UpdateArea };
