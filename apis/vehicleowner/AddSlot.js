const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function AddSlot(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("charging_station_slots");

        const { 
            charging_station_id, charging_type, charging_station_slots_price_per_slot,
            charging_station_slots_date, charging_station_start_time,
            charging_station_end_time, charging_station_slots,charging_station_slots_available_slot,  
        } = req.body;

        if (!charging_station_id || !charging_type) {
            return res.status(400).json({ success: false, message: "charging_station_id and charging_type required!" });
        }

        await collection.insertOne({
            charging_station_id: new ObjectId(charging_station_id),
            charging_type,
            charging_station_slots_price_per_slot: Number(charging_station_slots_price_per_slot),
            charging_station_slots_date: new Date(charging_station_slots_date),
            charging_station_start_time,
            charging_station_end_time,
            charging_station_slots: Number(charging_station_slots),
            charging_station_slots_available_slot: Number(charging_station_slots_available_slot),
            charging_station_status: "Available",
            created_at: new Date()
        });

        return res.status(201).json({ success: true, message: "Charging slot added successfully!" });

    } catch (error) {
        console.error("AddSlot.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { AddSlot };
