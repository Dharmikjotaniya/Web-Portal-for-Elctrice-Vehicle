const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewVehicleDetails(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("electric_vehicle");

        const vehicleId = req.params.id;

        if (!ObjectId.isValid(vehicleId)) {
            return res.status(400).json({ success: false, message: "Invalid vehicle ID!" });
        }

        const vehicle = await collection.findOne({ _id: new ObjectId(vehicleId) });

        if (!vehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found!" });
        }

        return res.status(200).json({ success: true, data: vehicle });

    } catch (error) {
        console.error("ViewVehicleDetails.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewVehicleDetails };
