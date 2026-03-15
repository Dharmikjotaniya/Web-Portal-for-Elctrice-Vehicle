// const { connectDb } = require("../../db/dbConnect");
// const { ObjectId } = require("mongodb");

// async function UpdateChargingStation(req, res) {
//     try {
//         const db = await connectDb();
//         const collection = db.collection("charging_station");

//         const stationId = req.params.id;
//         const {
//             charging_station_name, charging_station_address, charging_station_open_time,
//             charging_station_close_time, charging_station_late, charging_station_long,
//             charging_station_fire_safety, charging_station_status
//         } = req.body;

//         if (!ObjectId.isValid(stationId)) {
//             return res.status(400).json({ success: false, message: "Invalid station ID!" });
//         }

//         const existingStation = await collection.findOne({ _id:  ObjectId.createFromHexString(stationId) });

//         if (!existingStation) {
//             return res.status(404).json({success:false, message: "Charging station not found!"})

//         const updateData = {
//             charging_station_name: charging_station_name || existingStation.charging_station_name,

//             charging_station_address: charging_station_address || existingStation.charging_station_address,    
            
//             charging_station_open_time: charging_station_open_time || existingStation.charging_station_open_time,

          
//             charging_station_close_time: charging_station_close_time || existingStation.charging_station_close_time,

//             charging_station_late: parseFloat(charging_station_late) || existingStation.charging_station_late,

//             charging_station_long: parseFloat(charging_station_long) || existingStation.charging_station_long,

//             charging_station_fire_safety: charging_station_fire_safety || existingStation.charging_station_fire_safety, 

//             charging_station_status: charging_station_status || existingStation.charging_station_status
//         };

//         if (req.file) updateData.image = req.file.filename;

//         const result = await collection.updateOne(
//             { _id: new ObjectId(stationId) },
//             { $set: updateData }
//         );

//         if (result.matchedCount === 0) {
//             return res.status(404).json({ success: false, message: "Charging station not found!" });
//         }

//         return res.status(200).json({ success: true, message: "Charging station updated successfully!" });

//     } catch (error) {
//         console.error("UpdateChargingStation.js:", error);
//         return res.status(500).json({ success: false, message: "Internal server error!" });
//     }
// }

// module.exports = { UpdateChargingStation };
