const express = require("express");
const router = express.Router();
const { users } = require("@clerk/clerk-sdk-node");
const Client = require("../models/Client");
const Consultant = require("../models/Consultant");

// Sync Client or Consultant on Login
router.post("/sync-user", async (req, res) => {
  try {
    const { clerkId, email, name, profilePicture, userType, category } = req.body;

    // Validate required fields
    if (!clerkId || !email || !name || !profilePicture || !userType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate Clerk ID format (optional)
    if (typeof clerkId !== "string" || clerkId.length < 10) {
      return res.status(400).json({ error: "Invalid Clerk ID format" });
    }

    let user;
    if (userType === "client") {
      // Check if user already exists
      const existingClient = await Client.findOne({ clerkId }).lean();
      if (existingClient) {
        // Update only if changes exist
        user = await Client.findOneAndUpdate(
          { clerkId },
          { $set: { name, email, profilePicture, lastLogin: new Date() } },
          { new: true }
        );
      } else {
        // Create new client
        user = await Client.create({ clerkId, name, email, profilePicture, lastLogin: new Date() });
      }
    } else if (userType === "consultant") {
      if (!category) {
        return res.status(400).json({ error: "Category is required for consultants" });
      }

      // Validate category (should match allowed types)
      const allowedCategories = ["Educational", "Mental Health", "Career"];
      if (!allowedCategories.includes(category)) {
        return res.status(400).json({ error: "Invalid consultant category" });
      }

      const existingConsultant = await Consultant.findOne({ clerkId }).lean();
      if (existingConsultant) {
        user = await Consultant.findOneAndUpdate(
          { clerkId },
          { $set: { name, email, profilePicture, category, lastLogin: new Date() } },
          { new: true }
        );
      } else {
        user = await Consultant.create({ clerkId, name, email, profilePicture, category, lastLogin: new Date() });
      }
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    res.status(200).json({ message: "User synced successfully", user });
  } catch (error) {
    console.error("Sync User Error:", error);
    res.status(500).json({ error: "Failed to sync user", details: error.message });
  }
});

module.exports = router;
