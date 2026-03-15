const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function UpdateSlot(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("charging_station_slots");

        const slotId = req.params.id;
        const {
            charging_type, charging_station_slots_price_per_slot, charging_station_slots_date,
            charging_station_start_time, charging_station_end_time,
            charging_station_slots, charging_station_slots_available_slot, charging_station_status
        } = req.body;

        if (!ObjectId.isValid(slotId)) {
            return res.status(400).json({ success: false, message: "Invalid slot ID!" });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(slotId) },
            {
                $set: {
                    charging_type,
                    charging_station_slots_price_per_slot: Number(charging_station_slots_price_per_slot),
                    charging_station_slots_date: new Date(charging_station_slots_date),
                    charging_station_start_time, charging_station_end_time,
                    charging_station_slots: Number(charging_station_slots),
                    charging_station_slots_available_slot: Number(charging_station_slots_available_slot),
                    charging_station_status
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Slot not found!" });
        }

        return res.status(200).json({ success: true, message: "Slot updated successfully!" });

    } catch (error) {
        console.error("UpdateSlot.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { UpdateSlot };
