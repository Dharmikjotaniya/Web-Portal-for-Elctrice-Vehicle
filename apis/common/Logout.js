async function Logout(req, res) {
    try {
        // Client-side token clear karo (localStorage/sessionStorage)
        // Server side koi token nathi (JWT stateless chhe)
        return res.status(200).json({ success: true, message: "Logged out successfully!" });
    } catch (error) {
        console.error("Logout.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
}

module.exports = { Logout };
