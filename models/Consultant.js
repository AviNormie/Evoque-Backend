const mongoose = require("mongoose");

const ConsultantSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk User ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String }, // Pulled from Clerk
  category: { 
    type: String, 
    enum: ["Educational", "MentalHealth", "Career"], 
    required: true 
  }, 
  bio: { type: String, maxlength: 1000 },
  experience: { type: Number, default: 0 }, // Years of experience
  consultationFee: { type: Number, default: 0 }, // Price per session
  rating: { type: Number, default: 0 },
  reviews: [
    {
      client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
      rating: { type: Number, required: true },
      comment: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  availability: [
    {
      date: { type: String, required: true }, // Format: YYYY-MM-DD
      slots: [{ type: String }] // Example: ["10:00 AM", "2:00 PM"]
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Consultant", ConsultantSchema);
