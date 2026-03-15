const { connectDb } = require("../../db/dbConnect");

async function ForgetPassword(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");

        const { user_email } = req.body;

        if (!user_email) {
            return res.status(400).json({ success: false, message: "Email is required!" });
        }

        const user = await collection.findOne({ user_email });

        if (!user) {
            return res.status(404).json({ success: false, message: "Email not registered!" });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otp_expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await collection.updateOne(
            { user_email },
            { $set: { otp, otp_expiry } }
        );

        // In real project: send OTP via email (nodemailer)
        // For now returning OTP in response (only for testing)
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully!",
            otp // Remove this in production - send via email
        });

    } catch (error) {
        console.error("ForgetPassword.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
}

module.exports = { ForgetPassword };
