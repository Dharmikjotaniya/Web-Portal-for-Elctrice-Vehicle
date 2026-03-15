const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteSlot(req, res) { 
    try {
        const db = await connectDb();
        const collection = db.collection("charging_station_slots");

        const slotId = req.params.id;

        if (!ObjectId.isValid(slotId)) {
            return res.status(400).json({ success: false, message: "Invalid slot ID!" });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(slotId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Slot not found!" });
        }

        return res.status(200).json({ success: true, message: "Slot deleted successfully!" });

    } catch (error) {
        console.error("DeleteSlot.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { DeleteSlot };
