const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function BookChargingSlot(req, res) {
    try {
        const db = await connectDb();
        const bookingCollection = db.collection("booking");
        const slotsCollection = db.collection("charging_station_slots");

        const { user_id, charging_station_id, charging_station_slot_id, booking_start_time, booking_end_time, booking_duration, booking_total_amount } = req.body;

        if (!user_id || !charging_station_slot_id) {
            return res.status(400).json({ success: false, message: "user_id and charging_station_slot_id required!" });
        }

        // Check slot available
        const slot = await slotsCollection.findOne({ _id: new ObjectId(charging_station_slot_id) });

        if (!slot) {
            return res.status(404).json({ success: false, message: "Slot not found!" });
        }

        if (slot.charging_station_slots_available_slot <= 0) {
            return res.status(400).json({ success: false, message: "No slots available!" });
        }

        // Create booking
        await bookingCollection.insertOne({
            user_id: new ObjectId(user_id),
            charging_station_id: new ObjectId(charging_station_id),
            charging_station_slot_id: new ObjectId(charging_station_slot_id),
            booking_type: "charging_slot",
            booking_start_time,
            booking_end_time,
            booking_duration,
            booking_total_amount: Number(booking_total_amount),
            booking_status: "active",
            created_at: new Date()
        });

        // Decrease available slots by 1
        await slotsCollection.updateOne(
            { _id: new ObjectId(charging_station_slot_id) },
            { $inc: { charging_station_slots_available_slot: -1 } }
        );

        return res.status(201).json({ success: true, message: "Charging slot booked successfully!" });

    } catch (error) {
        console.error("BookChargingSlot.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { BookChargingSlot };
