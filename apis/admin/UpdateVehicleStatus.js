const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function UpdateVehicleStatus(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("electric_vehicle");

        const vehicleId = req.params.id;
        const { electric_vehicle_status } = req.body;

        if (!ObjectId.isValid(vehicleId)) {
            return res.status(400).json({ success: false, message: "Invalid vehicle ID!" });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(vehicleId) },
            { $set: { electric_vehicle_status } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Vehicle not found!" });
        }

        return res.status(200).json({ success: true, message: "Vehicle status updated!" });

    } catch (error) {
        console.error("UpdateVehicleStatus.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { UpdateVehicleStatus };
