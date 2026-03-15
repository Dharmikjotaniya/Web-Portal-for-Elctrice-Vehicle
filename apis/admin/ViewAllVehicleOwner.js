const { connectDb } = require("../../db/dbConnect");

async function ViewAllVehicleOwner(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");

        const owners = await collection.find({ user_role: "Owner" }).toArray();

        return res.status(200).json({ success: true, data: owners });

    } catch (error) {
        console.error("ViewAllVehicleOwner.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewAllVehicleOwner };
