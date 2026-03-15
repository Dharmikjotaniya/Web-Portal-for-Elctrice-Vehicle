const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function CancelSlotBooking(req, res) {
    try {
        const db = await connectDb();
        const bookingCollection = db.collection("booking");
        const slotsCollection = db.collection("charging_station_slots");

        const bookingId = req.params.id;

        if (!ObjectId.isValid(bookingId)) {
            return res.status(400).json({ success: false, message: "Invalid booking ID!" });
        }

        const booking = await bookingCollection.findOne({ _id: new ObjectId(bookingId) });

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found!" });
        }

        if (booking.booking_status === "cancelled") {
            return res.status(400).json({ success: false, message: "Booking already cancelled!" });
        }

        // Update booking status to cancelled
        await bookingCollection.updateOne(
            { _id: new ObjectId(bookingId) },
            { $set: { booking_status: "cancelled" } }
        );

        // Increase available slot count by 1
        if (booking.charging_station_slot_id) {
            await slotsCollection.updateOne(
                { _id: new ObjectId(booking.charging_station_slot_id) },
                { $inc: { charging_station_slots_available_slot: 1 } }
            );
        }

        return res.status(200).json({ success: true, message: "Slot booking cancelled successfully!" });

    } catch (error) {
        console.error("CancelSlotBooking.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { CancelSlotBooking };
