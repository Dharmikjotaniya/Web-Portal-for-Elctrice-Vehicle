const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function UnblockUser(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");

        const userId = req.params.id;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID!" });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { user_status: "Active" } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        return res.status(200).json({ success: true, message: "User unblocked successfully!" });

    } catch (error) {
        console.error("UnblockUser.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { UnblockUser };
