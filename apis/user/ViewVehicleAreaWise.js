const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewVehicleAreaWise(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("electric_vehicle");

        const areaId = req.params.id;

        if (!ObjectId.isValid(areaId)) {
            return res.status(400).json({ success: false, message: "Invalid area ID!" });
        }

        const vehicles = await collection.find({
            area_id: new ObjectId(areaId),
            electric_vehicle_status: "Available"
        }).toArray();

        return res.status(200).json({ success: true, data: vehicles });

    } catch (error) {
        console.error("ViewVehicleAreaWise.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewVehicleAreaWise };
