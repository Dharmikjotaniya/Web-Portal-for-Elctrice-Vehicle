const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function AddChargingStation(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("charging_station");

        const {
            owner_id, area_id, charging_station_name, 
            charging_station_address,
            charging_station_open_time, charging_station_close_time,
            charging_station_late, charging_station_long, charging_station_fire_safety
        } = req.body;

        const charging_station_image = req.file ? req.file.filename : "";

        if (!owner_id || !area_id || !charging_station_name) {
            return res.status(400).json({ success: false, message: "owner_id, area_id and station name required!" });
        }

        await collection.insertOne({
            owner_id: new ObjectId(owner_id),
            area_id: new ObjectId(area_id),
            charging_station_name,
            charging_station_address,
            charging_station_open_time,
            charging_station_close_time,
            charging_station_late: parseFloat(charging_station_late),
            charging_station_long: parseFloat(charging_station_long),
            charging_station_fire_safety,
            charging_station_status: "Active",
            charging_station_image,
            created_at: new Date()
        });

        return res.status(201).json({ success: true, message: "Charging station added successfully!" });

    } catch (error) {
        console.error("AddChargingStation.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { AddChargingStation };
