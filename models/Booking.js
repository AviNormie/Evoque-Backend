const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  consultant: { type: mongoose.Schema.Types.ObjectId, ref: "Consultant", required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  time: { type: String, required: true }, // Example: "10:00 AM"
  category: { type: String, enum: ["Educational", "MentalHealth", "Career"], required: true },
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "completed", "canceled"], 
    default: "pending" 
  },
  socketRoom: { type: String, unique: true }, // Used for video call
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  notes: { type: String, maxlength: 500 }, // Clients can add notes
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);