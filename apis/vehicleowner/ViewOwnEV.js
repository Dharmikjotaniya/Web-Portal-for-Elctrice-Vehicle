const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewOwnEV(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("electric_vehicle");

        const { owner_id } = req.body;

        if (!owner_id || !ObjectId.isValid(owner_id)) {
            return res.status(400).json({ success: false, message: "Valid owner_id required!" });
        }

        const vehicles = await collection.find({ owner_id: new ObjectId(owner_id) }).toArray();

        return res.status(200).json({ success: true, data: vehicles });

    } catch (error) {
        console.error("ViewOwnEV.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewOwnEV };
