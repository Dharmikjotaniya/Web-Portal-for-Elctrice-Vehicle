const { connectDb } = require("../../db/dbConnect");

async function ResetPassword(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");

        const { user_email, otp, new_password } = req.body;

        if (!user_email || !otp || !new_password) {
            return res.status(400).json({ success: false, message: "Email, OTP and new password required!" });
        }

        const user = await collection.findOne({ user_email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP!" });
        }

        if (new Date() > new Date(user.otp_expiry)) {
            return res.status(400).json({ success: false, message: "OTP expired! Request new OTP." });
        }

        await collection.updateOne(
            { user_email },
            { $set: { user_password: new_password }, $unset: { otp: "", otp_expiry: "" } }
        );

        return res.status(200).json({ success: true, message: "Password reset successfully!" });

    } catch (error) {
        console.error("ResetPassword.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
}

module.exports = { ResetPassword };
