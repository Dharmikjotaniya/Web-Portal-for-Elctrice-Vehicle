const { connectDb } = require("../../db/dbConnect");

async function ViewAllInquiry(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("contact_us");

        const inquiries = await collection.find({}).toArray();

        return res.status(200).json({ success: true, data: inquiries });

    } catch (error) {
        console.error("ViewAllInquiry.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { ViewAllInquiry };
