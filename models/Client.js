const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk User ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String }, // Pulled from Clerk
  bio: { type: String, maxlength: 500 },
  calendar: [
    {
      date: { type: String, required: true }, // Format: YYYY-MM-DD
      bookings: [
        {
          consultant: { type: mongoose.Schema.Types.ObjectId, ref: "Consultant" },
          time: { type: String, required: true }
        }
      ]
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", ClientSchema);
