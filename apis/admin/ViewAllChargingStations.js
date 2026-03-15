const { connectDb } = require("../../db/dbConnect");

async function ViewAllChargingStations(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("charging_station");

        const stations = await collection.find({}).toArray();

        return res.status(200).json({ success: true, data: stations });

    } catch (error) {
        console.error("ViewAllChargingStations.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewAllChargingStations };
