const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewVehicleOfOwner(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("electric_vehicle");

        const ownerId = req.params.id;

        if (!ObjectId.isValid(ownerId)) {
            return res.status(400).json({ success: false, message: "Invalid owner ID!" });
        }

        const vehicles = await collection.find({ _id: new ObjectId(ownerId) }).toArray();

        return res.status(200).json({ success: true, data: vehicles });

    } catch (error) {
        console.error("ViewVehicleOfOwner.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewVehicleOfOwner };
