const { connectDb } = require("../../db/dbConnect");

async function AddArea(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("area");

        const { area_name, pincode, area_status } = req.body;

        if (!area_name || !pincode) {
            return res.status(400).json({ success: false, message: "Area name and pincode required!" });
        }

        await collection.insertOne({
            area_name,
            city_name: "Ahmedabad",
            pincode,
            area_status: "Active",
            created_at: new Date()
        });

        return res.status(201).json({ success: true, message: "Area added successfully!" });

    } catch (error) {
        console.error("AddArea.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { AddArea };
