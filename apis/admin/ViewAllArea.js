const { connectDb } = require("../../db/dbConnect");

async function ViewAllArea(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("area");

        const areas = await collection.find({}).toArray();

        return res.status(200).json({ success: true, data: areas });

    } catch (error) {
        console.error("ViewAllArea.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewAllArea };
