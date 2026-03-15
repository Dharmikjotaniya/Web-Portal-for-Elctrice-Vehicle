const express = require("express");
const { connectDb } = require("./db/dbConnect");
const { imageUpload } = require("./multer/multer");
require("dotenv").config();
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("./upload/images"));
app.use(cors()); // Add this before your routes

connectDb();

// =============================================
// COMMON APIs (7)
// =============================================

const { Register } = require("./apis/common/Register");
const { Login } = require("./apis/common/Login");
const { ViewArea } = require("./apis/common/ViewArea");
const { ForgetPassword } = require("./apis/common/ForgetPassword");
const { ResetPassword } = require("./apis/common/ResetPassword");
const { Logout } = require("./apis/common/Logout");

app.post("/register", Register);
app.post("/login", Login);
app.get("/area/:id", ViewArea);
app.post("/forgetpassword", ForgetPassword);
app.post("/resetpassword", ResetPassword);
app.post("/logout", Logout);

// =============================================
// USER APIs (16)
// =============================================

// View (GET)
const { ViewProfile } = require("./apis/user/ViewProfile");
const { ViewVehicleAreaWise } = require("./apis/user/ViewVehicleAreaWise");
const { ViewVehicleDetails } = require("./apis/user/ViewVehicleDetails");
const { ViewChargingStationsAreaWise } = require("./apis/user/ViewChargingStationsAreaWise");
const { ViewChargingStationDetails } = require("./apis/user/ViewChargingStationDetails");
const { ViewChargingStationSlots } = require("./apis/user/ViewChargingStationSlots");
const { ViewBookingHistory } = require("./apis/user/ViewBookingHistory");
const { ViewPaymentHistory } = require("./apis/user/ViewPaymentHistory");
const { ViewMyFeedback } = require("./apis/user/ViewMyFeedback");
const { ViewComplaintStatus } = require("./apis/user/ViewComplaintStatus");

app.post("/user/profile", ViewProfile);
app.get("/user/vehicles/:id", ViewVehicleAreaWise);
app.get("/user/vehicledetail/:id", ViewVehicleDetails);
app.get("/user/chargingstations/:id", ViewChargingStationsAreaWise);
app.get("/user/chargingstationdetail/:id", ViewChargingStationDetails);
app.get("/user/slots/:id", ViewChargingStationSlots);
app.post("/user/bookinghistory", ViewBookingHistory);
app.post("/user/paymenthistory", ViewPaymentHistory);
app.post("/user/myfeedback", ViewMyFeedback);
app.post("/user/complaintstatus", ViewComplaintStatus);

// Add (POST)
const { BookVehicle } = require("./apis/user/BookVehicle");
const { BookChargingSlot } = require("./apis/user/BookChargingSlot");
const { MakePayment } = require("./apis/user/MakePayment");
const { AddFeedback } = require("./apis/user/AddFeedback");
const { AddComplaint } = require("./apis/user/AddComplaint");
const { AddInquiry } = require("./apis/user/AddInquiry");

app.post("/user/bookvehicle", BookVehicle);
app.post("/user/bookslot", BookChargingSlot);
app.post("/user/makepayment", MakePayment);
app.post("/user/addfeedback", AddFeedback);
app.post("/user/addcomplaint", AddComplaint);
app.post("/user/addinquiry", AddInquiry);

// Update (PUT)
const { UpdateProfile } = require("./apis/user/UpdateProfile");
app.put("/user/updateprofile", imageUpload.single("user_image"), UpdateProfile);

// Delete (PUT - status change)
const { CancelVehicleBooking } = require("./apis/user/CancelVehicleBooking");
const { CancelSlotBooking } = require("./apis/user/CancelSlotBooking");

app.put("/user/cancelvehiclebooking/:id", CancelVehicleBooking);
app.put("/user/cancelslotbooking/:id", CancelSlotBooking);

// =============================================
// VEHICLE OWNER APIs (17)
// =============================================

// View (GET)
const { ViewOwnerProfile } = require("./apis/vehicleowner/ViewOwnerProfile");
const { ViewOwnEV } = require("./apis/vehicleowner/ViewOwnEV");
const { ViewOwnChargingStations } = require("./apis/vehicleowner/ViewOwnChargingStations");
const { ViewSlots } = require("./apis/vehicleowner/ViewSlots");
const { ViewOwnerBookingHistory } = require("./apis/vehicleowner/ViewBookingHistory");
const { ViewOwnerPayments } = require("./apis/vehicleowner/ViewPayments");
const { ViewOwnerFeedback } = require("./apis/vehicleowner/ViewFeedback");

app.post("/owner/profile", ViewOwnerProfile);
app.post("/owner/vehicles", ViewOwnEV);
app.post("/owner/chargingstations", ViewOwnChargingStations);
app.get("/owner/slots/:id", ViewSlots);
app.post("/owner/bookinghistory", ViewOwnerBookingHistory);
app.post("/owner/payments", ViewOwnerPayments);
app.post("/owner/feedback", ViewOwnerFeedback);

// Add (POST)
const { AddEv } = require("./apis/vehicleowner/AddEv");
const { AddChargingStation } = require("./apis/vehicleowner/AddChargingStation");
const { AddSlot } = require("./apis/vehicleowner/AddSlot");

app.post("/owner/addev", imageUpload.single("electric_vehicle_image"), AddEv);
app.post("/owner/addchargingstation", imageUpload.single("charging_station_image"), AddChargingStation);
app.post("/owner/addslot", AddSlot);

// Update (PUT)
const { UpdateOwnerProfile } = require("./apis/vehicleowner/UpdateOwnerProfile");
const { UpdateEv } = require("./apis/vehicleowner/UpdateEv");
// const { UpdateChargingStation } = require("./apis/vehicleowner/UpdateChargingStation");
const { UpdateSlot } = require("./apis/vehicleowner/UpdateSlot");

app.put("/owner/updateprofile", imageUpload.single("user_image"), UpdateOwnerProfile);
app.put("/owner/updateev/:id", imageUpload.single("electric_vehicle_image"), UpdateEv);
// app.put("/owner/updatechargingstation/:id", imageUpload.single("charging_station_image"), UpdateChargingStation);
app.put("/owner/updateslot/:id", UpdateSlot);

// Delete (DELETE) 
const { DeleteEv } = require("./apis/vehicleowner/DeleteEv");
const { DeleteChargingStation: DeleteOwnerStation } = require("./apis/vehicleowner/DeleteChargingStation");
const { DeleteSlot } = require("./apis/vehicleowner/DeleteSlot");

app.delete("/owner/deleteev/:id", DeleteEv);
app.delete("/owner/deletechargingstation/:id", DeleteOwnerStation);
app.delete("/owner/deleteslot/:id", DeleteSlot);

// =============================================
// ADMIN APIs (35)
// =============================================

// View (GET)
const { ViewAllUser } = require("./apis/admin/ViewAllUser");
const { ViewUserDetails } = require("./apis/admin/ViewUserDetails");
const { ViewAllVehicleOwner } = require("./apis/admin/ViewAllVehicleOwner");
const { ViewVehicleOwnerDetails } = require("./apis/admin/ViewVehicleOwnerDetails");
const { ViewVehicleOfOwner } = require("./apis/admin/ViewVehicleOfOwner");
const { ViewChargingStationsOfOwner } = require("./apis/admin/ViewChargingStationsOfOwner");
const { ViewAllVehicles } = require("./apis/admin/ViewAllVehicles");
const { ViewAllChargingStations } = require("./apis/admin/ViewAllChargingStations");
const { ViewAllArea } = require("./apis/admin/ViewAllArea");
const { ViewAllBookings } = require("./apis/admin/ViewAllBookings");
const { ViewAllPayments } = require("./apis/admin/ViewAllPayments");
const { ViewAllFeedback } = require("./apis/admin/ViewAllFeedback");
const { ViewAllComplaints } = require("./apis/admin/ViewAllComplaints");
const { ViewAllInquiry } = require("./apis/admin/ViewAllInquiry");

app.get("/admin/users", ViewAllUser);
app.get("/admin/user/:id", ViewUserDetails);
app.get("/admin/owners", ViewAllVehicleOwner);
app.get("/admin/owner/:id", ViewVehicleOwnerDetails);
app.get("/admin/owner/:id/vehicles", ViewVehicleOfOwner);
app.get("/admin/owner/:id/chargingstations", ViewChargingStationsOfOwner);
app.get("/admin/vehicles", ViewAllVehicles);
app.get("/admin/chargingstations", ViewAllChargingStations);
app.get("/admin/areas", ViewAllArea);
app.get("/admin/bookings", ViewAllBookings);
app.get("/admin/payments", ViewAllPayments);
app.get("/admin/feedbacks", ViewAllFeedback);
app.get("/admin/complaints", ViewAllComplaints);
app.get("/admin/inquiries", ViewAllInquiry);

// Add (POST)
const { AddArea } = require("./apis/admin/AddArea");
const { ReplyComplaint } = require("./apis/admin/ReplyComplaint");

app.post("/admin/addarea", AddArea);
app.put("/admin/replycomplaint/:id", ReplyComplaint);   // PUT - existing record update

// Update (PUT)
const { BlockUser } = require("./apis/admin/BlockUser");
const { UnblockUser } = require("./apis/admin/UnblockUser");
const { BlockVehicleOwner } = require("./apis/admin/BlockVehicleOwner");
const { UnblockVehicleOwner } = require("./apis/admin/UnblockVehicleOwner");
const { UpdateArea } = require("./apis/admin/UpdateArea");
const { UpdateComplaintStatus } = require("./apis/admin/UpdateComplaintStatus");
const { UpdateInquiryStatus } = require("./apis/admin/UpdateInquiryStatus");
const { UpdateVehicleStatus } = require("./apis/admin/UpdateVehicleStatus");
const { UpdateChargingStationStatus } = require("./apis/admin/UpdateChargingStationStatus");

app.put("/admin/blockuser/:id", BlockUser);
app.put("/admin/unblockuser/:id", UnblockUser);
app.put("/admin/blockvehicleowner/:id", BlockVehicleOwner);
app.put("/admin/unblockvehicleowner/:id", UnblockVehicleOwner);
app.put("/admin/updatearea/:id", UpdateArea);
app.put("/admin/updatecomplaintstatus/:id", UpdateComplaintStatus);
app.put("/admin/updateinquirystatus/:id", UpdateInquiryStatus);
app.put("/admin/updatevehiclestatus/:id", UpdateVehicleStatus);
app.put("/admin/updatechargingstationstatus/:id", UpdateChargingStationStatus);

// Delete (DELETE)
const { DeleteArea } = require("./apis/admin/DeleteArea");
const { DeleteVehicle } = require("./apis/admin/DeleteVehicle");
const { DeleteChargingStation } = require("./apis/admin/DeleteChargingStation");

app.delete("/admin/deletearea/:id", DeleteArea);
app.delete("/admin/deletevehicle/:id", DeleteVehicle);
app.delete("/admin/deletechargingstation/:id", DeleteChargingStation);

// =============================================
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📦 Total APIs: 75 registered`);
});
