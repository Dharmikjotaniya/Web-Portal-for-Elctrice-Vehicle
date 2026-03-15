const { connectDb } = require("../../db/dbConnect");

async function AddInquiry(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("contact_us");

        const { inquiry_name, inquiry_email, inquiry_mno, inquiry_type, inquiry_details } = req.body;

        if (!inquiry_name || !inquiry_email || !inquiry_mno || !inquiry_details) {
            return res.status(400).json({ success: false, message: "All fields required!" });
        }

        await collection.insertOne({
            inquiry_name,
            inquiry_email,
            inquiry_mno,
            inquiry_type ,
            inquiry_details,
            inquiry_status: "pending",
            created_at: new Date()
        });

        return res.status(201).json({ success: true, message: "Thank you for contacting us!" });

    } catch (error) {
        console.error("AddInquiry.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { AddInquiry };
