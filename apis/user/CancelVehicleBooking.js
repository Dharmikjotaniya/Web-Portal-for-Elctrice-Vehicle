const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function CancelVehicleBooking(req, res) {
    try {
        const db = await connectDb();
        const bookingCollection = db.collection("booking");
        const vehicleCollection = db.collection("electric_vehicle");

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

        // Make vehicle available again
        if (booking.electric_vehicle_id) {
            await vehicleCollection.updateOne(
                { _id: new ObjectId(booking.electric_vehicle_id) },
                { $set: { electric_vehicle_is_available: "yes", electric_vehicle_status: "available" } }
            );
        }

        return res.status(200).json({ success: true, message: "Vehicle booking cancelled successfully!" });

    } catch (error) {
        console.error("CancelVehicleBooking.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { CancelVehicleBooking };
