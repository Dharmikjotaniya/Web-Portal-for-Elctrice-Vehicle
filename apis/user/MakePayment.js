const { connectDb } = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function MakePayment(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("payment");

        const { user_id, booking_id, transaction_id, payment_amount, payment_mode, payment_status } = req.body;

        if (!user_id || !booking_id || !payment_amount || !payment_mode) {
            return res.status(400).json({ success: false, message: "user_id, booking_id, payment_amount and payment_mode required!" });
        }

        await collection.insertOne({
            user_id: new ObjectId(user_id),
            booking_id: new ObjectId(booking_id),
            transaction_id: transaction_id || "",
            payment_amount: Number(payment_amount),
            payment_mode,
            payment_status: payment_status || "paid",
            created_at: new Date()
        });

        return res.status(201).json({ success: true, message: "Payment recorded successfully!" });

    } catch (error) {
        console.error("MakePayment.js:", error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

module.exports = { MakePayment };
