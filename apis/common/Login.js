const { connectDb } = require("../../db/dbConnect");

async function Login(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");
        const { user_email, user_password } = req.body;

        if (!user_email || !user_password) {
            return res.status(400).json({ success: false, message: "Email and Password required!" });
        }

        const userData = await collection.findOne({ user_email, user_password });

        // FIX: Check null FIRST, then check status
        if (!userData) {
            return res.status(404).json({ success: false, message: "Invalid Email or Password!" });
        }

        if (userData.user_status !== "Active") {
            return res.status(403).json({ success: false, message: "Your account is blocked! Contact admin." });
        }

        const { user_password: _unused_pw, ...userWithoutPassword } = userData;

        return res.status(200).json({
            success: true, message: "Login successful!", userData: userWithoutPassword
        });
    } catch (error) {
        console.error("Login.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
}

module.exports = { Login };
