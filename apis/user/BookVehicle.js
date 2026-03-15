const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function BookVehicle(req, res) {
    try {
        const db = await connectDb();
        const bookingCollection = db.collection("booking");
        const vehicleCollection = db.collection("electric_vehicle");

        const { user_id, electric_vehicle_id, booking_start_time, booking_end_time, booking_duration, booking_total_amount } = req.body;

        if (!user_id || !electric_vehicle_id) {
            return res.status(400).json({ success: false, message: "user_id and electric_vehicle_id required!" });
        }

        // Check vehicle available or not
        const vehicle = await vehicleCollection.findOne({ _id: new ObjectId(electric_vehicle_id) });

        if (!vehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found!" });
        }

        if (vehicle.electric_vehicle_is_available === "no") {
            return res.status(400).json({ success: false, message: "Vehicle is not available!" });
        }

        // Create booking
        await bookingCollection.insertOne({
            user_id: new ObjectId(user_id),
            electric_vehicle_id: new ObjectId(electric_vehicle_id),
            booking_type: "vehicle",
            booking_start_time,
            booking_end_time,
            booking_duration,
            booking_total_amount: Number(booking_total_amount),
            booking_status: "active",
            created_at: new Date()
        });

        // Mark vehicle as unavailable
        await vehicleCollection.updateOne(
            { _id: new ObjectId(electric_vehicle_id) },
            { $set: { electric_vehicle_is_available: "no", electric_vehicle_status: "booked" } }
        );

        return res.status(201).json({ success: true, message: "Vehicle booked successfully!" });

    } catch (error) {
        console.error("BookVehicle.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { BookVehicle };
