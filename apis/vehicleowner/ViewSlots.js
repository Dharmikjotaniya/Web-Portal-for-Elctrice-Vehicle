const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewSlots(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("charging_station_slots");

        const stationId = req.params.id;

        if (!ObjectId.isValid(stationId)) {
            return res.status(400).json({ success: false, message: "Invalid station ID!" });
        }

        const slots = await collection.find({ charging_station_id: new ObjectId(stationId) }).toArray();

        return res.status(200).json({ success: true, data: slots });

    } catch (error) {
        console.error("ViewSlots.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewSlots };
