const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function UpdateProfile(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");

        const { user_id, user_name, user_email, user_mno, user_address } = req.body;

        if (!user_id || !ObjectId.isValid(user_id)) {
            return res.status(400).json({
                success: false,
                message: "Valid user_id required!"
            });
        }

        let updateData = {
            user_name,
            user_email,
            user_mno,
            user_address
        };

        // If image uploaded
        if (req.file) {
            updateData.user_image = req.file.filename;
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(user_id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully!"
        });

    } catch (error) {
        console.error("UpdateProfile.js:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
}

module.exports = { UpdateProfile };