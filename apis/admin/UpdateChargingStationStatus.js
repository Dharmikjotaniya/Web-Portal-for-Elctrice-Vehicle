const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function UpdateChargingStationStatus(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("charging_station");

        const stationId = req.params.id;
        const { charging_station_status } = req.body;

        if (!ObjectId.isValid(stationId)) {
            return res.status(400).json({ success: false, message: "Invalid station ID!" });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(stationId) },
            { $set: { charging_station_status } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Charging station not found!" });
        }

        return res.status(200).json({ success: true, message: "Charging station status updated!" });

    } catch (error) {
        console.error("UpdateChargingStationStatus.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { UpdateChargingStationStatus };
