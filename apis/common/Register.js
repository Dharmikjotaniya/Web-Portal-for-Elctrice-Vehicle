const { connectDb } = require("../../db/dbConnect");


async function Register(req, res) {
    try {
        const db = await connectDb();
        const collection = db.collection("user");

        const { user_name, user_email, user_mno, user_password, user_role, owner_proof_id } = req.body;

        // Validation
        if (!user_name || !user_email || !user_mno || !user_password || !user_role) {
            return res.status(400).json({ success: false, message: "Missing fields!" });
        }

        const existing = await collection.findOne({ user_email });
        if (existing) {
            return res.status(400).json({ success: false, message: "Email already registered!" });
        }

        // Build the document dynamically
        const newUser = {
            user_name,
            user_email,
            user_mno,
            user_password,
            user_role,
            user_status: "Active",
            created_at: new Date()
        };

        // Only add owner_proof_id if it exists (for Owners)
        if (user_role === 'Owner' && owner_proof_id) {
            newUser.owner_proof_id = owner_proof_id;
        }

        await collection.insertOne(newUser);

        return res.status(201).json({ success: true, message: "Registered successfully!" });

    } catch (error) {
        console.error("Register.js Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports = { Register };