const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function AddEv(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("electric_vehicle");

        const {
            owner_id, area_id, electric_vehicle_name, electric_vehicle_brand,
            electric_vehicle_model, electric_vehicle_type,electric_vehicle_address_of_pickup,
            electric_vehicle_no, electric_vehicle_battery_capacity, electric_vehicle_range_km,
            electric_vehicle_rent_price_per_hour
        } = req.body;

        const electric_vehicle_image = req.file ? req.file.filename : "";

        if (!owner_id || !area_id || !electric_vehicle_name || !electric_vehicle_type) {
            return res.status(400).json({ success: false, message: "owner_id, area_id, name and type required!" });
        }

        await collection.insertOne({
            owner_id: new ObjectId(owner_id),
            area_id: new ObjectId(area_id),
            electric_vehicle_name,
            electric_vehicle_brand,
            electric_vehicle_model,
            electric_vehicle_type,
            electric_vehicle_address_of_pickup,
            electric_vehicle_no,
            electric_vehicle_battery_capacity,
            electric_vehicle_range_km: Number(electric_vehicle_range_km),
            electric_vehicle_image,
            electric_vehicle_rent_price_per_hour: Number(electric_vehicle_rent_price_per_hour),
            electric_vehicle_is_available: "Yes",
            electric_vehicle_status: "Active",
            created_at: new Date()
        });

        return res.status(201).json({ success: true, message: "Electric vehicle added successfully!" });

    } catch (error) {
        console.error("AddEv.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { AddEv };
