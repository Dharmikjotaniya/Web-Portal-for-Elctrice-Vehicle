const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function UpdateEv(req, res) { 
    try {
        const db = await connectDb();
        const collection = db.collection("electric_vehicle");

        const vehicleId = req.params.id;
        const {
            electric_vehicle_name, electric_vehicle_brand, electric_vehicle_model,
            electric_vehicle_type, electric_vehicle_address_of_pickup, electric_vehicle_no,
            electric_vehicle_battery_capacity, electric_vehicle_range_km,
            electric_vehicle_rent_price_per_hour, electric_vehicle_status
        } = req.body;

        if (!ObjectId.isValid(vehicleId)) {
            return res.status(400).json({ success: false, message: "Invalid vehicle ID!" });
        }

        const updateData = {
            electric_vehicle_name, electric_vehicle_brand, electric_vehicle_model,
            electric_vehicle_type, electric_vehicle_address_of_pickup, electric_vehicle_no,
            electric_vehicle_battery_capacity,
            electric_vehicle_range_km: Number(electric_vehicle_range_km),
            electric_vehicle_rent_price_per_hour: Number(electric_vehicle_rent_price_per_hour),
            electric_vehicle_status
        };

        if (req.file) updateData.electric_vehicle_image = req.file.filename;

        const result = await collection.updateOne(
            { _id: new ObjectId(vehicleId) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Vehicle not found!" });
        }

        return res.status(200).json({ success: true, message: "Vehicle updated successfully!" });

    } catch (error) {
        console.error("UpdateEv.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { UpdateEv };
