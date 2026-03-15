const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewChargingStationsAreaWise(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("charging_station");

        const areaId = req.params.id;

        if (!ObjectId.isValid(areaId)) {
            return res.status(400).json({ success: false, message: "Invalid area ID!" });
        }

        const stations = await collection.find({
            area_id: new ObjectId(areaId),
            charging_station_status: "Active"
        }).toArray();

        return res.status(200).json({ success: true, data: stations });

    } catch (error) {
        console.error("ViewChargingStationsAreaWise.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewChargingStationsAreaWise };
