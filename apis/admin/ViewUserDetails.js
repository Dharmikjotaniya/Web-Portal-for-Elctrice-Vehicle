const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function ViewUserDetails(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");

        const userId = req.params.id;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID!" });
        }

        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        return res.status(200).json({ success: true, data: user });

    } catch (error) {
        console.error("ViewUserDetails.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewUserDetails };
