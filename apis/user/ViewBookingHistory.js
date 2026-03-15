const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewBookingHistory(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("booking");

        const { user_id } = req.body;

        if (!user_id || !ObjectId.isValid(user_id)) {
            return res.status(400).json({ success: false, message: "Valid user_id required!" });
        }

        const bookings = await collection.find({ user_id: new ObjectId(user_id) }).toArray();

        return res.status(200).json({ success: true, data: bookings });

    } catch (error) {
        console.error("ViewBookingHistory.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewBookingHistory };
