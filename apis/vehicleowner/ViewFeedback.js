const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewOwnerFeedback(req, res) {
    try {
        const db = await connectDb();
        const feedbackCollection = db.collection("feedback");
        const bookingCollection = db.collection("booking");
        const vehicleCollection = db.collection("electric_vehicle");

        const { owner_id } = req.body;

        if (!owner_id || !ObjectId.isValid(owner_id)) {
            return res.status(400).json({ success: false, message: "Valid owner_id required!" });
        }

        // Get all vehicles of this owner
        const vehicles = await vehicleCollection.find({ owner_id: new ObjectId(owner_id) }).toArray();
        const vehicleIds = vehicles.map(v => v._id);

        // Get all bookings for those vehicles
        const bookings = await bookingCollection.find({
            electric_vehicle_id: { $in: vehicleIds }
        }).toArray();
        const bookingIds = bookings.map(b => b._id);

        // Get feedbacks for those bookings
        const feedbacks = await feedbackCollection.find({
            booking_id: { $in: bookingIds }
        }).toArray();

        return res.status(200).json({ success: true, data: feedbacks });

    } catch (error) {
        console.error("ViewOwnerFeedback.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewOwnerFeedback };
