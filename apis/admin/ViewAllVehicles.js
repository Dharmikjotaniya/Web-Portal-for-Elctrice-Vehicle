const { connectDb } = require("../../db/dbConnect");

async function ViewAllVehicles(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("electric_vehicle");

        const vehicles = await collection.find({}).toArray();

        return res.status(200).json({ success: true, data: vehicles });

    } catch (error) {
        console.error("ViewAllVehicles.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewAllVehicles };
