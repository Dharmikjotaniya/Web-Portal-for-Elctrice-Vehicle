const { connectDb } = require("../../db/dbConnect");

async function ViewAllBookings(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("booking");

        const bookings = await collection.find({}).toArray();

        return res.status(200).json({ success: true, data: bookings });

    } catch (error) {
        console.error("ViewAllBookings.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewAllBookings };
