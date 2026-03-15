const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewChargingStationDetails(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("charging_station");

        const stationId = req.params.id;

        if (!ObjectId.isValid(stationId)) {
            return res.status(400).json({ success: false, message: "Invalid station ID!" });
        }

        const station = await collection.findOne({ _id: new ObjectId(stationId) });

        if (!station) {
            return res.status(404).json({ success: false, message: "Charging station not found!" });
        }

        return res.status(200).json({ success: true, data: station });

    } catch (error) {
        console.error("ViewChargingStationDetails.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewChargingStationDetails };
