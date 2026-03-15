const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewArea(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("area");

        const areaId = req.params.id;

        if (!ObjectId.isValid(areaId)) {
            return res.status(400).json({ success: false, message: "Invalid area ID!" });
        }

        const area = await collection.findOne({ _id: new ObjectId(areaId) });

        if (!area) {
            return res.status(404).json({ success: false, message: "Area not found!" });
        }

        return res.status(200).json({ success: true, data: area });

    } catch (error) {
        console.error("ViewArea.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewArea };
