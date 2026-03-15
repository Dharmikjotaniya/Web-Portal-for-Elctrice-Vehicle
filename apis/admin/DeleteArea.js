const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteArea(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("area");

        const areaId = req.params.id;

        if (!ObjectId.isValid(areaId)) {
            return res.status(400).json({ success: false, message: "Invalid area ID!" });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(areaId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Area not found!" });
        }

        return res.status(200).json({ success: true, message: "Area deleted successfully!" });

    } catch (error) {
        console.error("DeleteArea.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { DeleteArea };
