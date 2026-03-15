const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteVehicle(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("electric_vehicle");

        const vehicleId = req.params.id;

        if (!ObjectId.isValid(vehicleId)) {
            return res.status(400).json({ success: false, message: "Invalid vehicle ID!" });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(vehicleId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Vehicle not found!" });
        }

        return res.status(200).json({ success: true, message: "Vehicle deleted successfully!" });

    } catch (error) {
        console.error("DeleteVehicle.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { DeleteVehicle };
