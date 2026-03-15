const { connectDb } = require("../../db/dbConnect");

async function ViewAllUser(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");

        const users = await collection.find({ user_role: "User"}).toArray();
        

        return res.status(200).json({ success: true, data: users });

    } catch (error) {
        console.error("ViewAllUser.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewAllUser };
