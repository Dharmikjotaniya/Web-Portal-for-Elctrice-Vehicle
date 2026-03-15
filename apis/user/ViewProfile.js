const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewProfile(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");

        const { user_id } = req.body;

        if (!user_id || !ObjectId.isValid(user_id)) {
            return res.status(400).json({ success: false, message: "Valid user_id required!" });
        }

        const user = await collection.findOne({ _id: new ObjectId(user_id) });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        return res.status(200).json({ success: true, data: user });

    } catch (error) {
        console.error("ViewProfile.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewProfile };
