require("dotenv").config();
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const clerkAuth = ClerkExpressRequireAuth({
  authorizedParties: [process.env.CLERK_FRONTEND_URL], // Update this with your frontend URL
});

module.exports = clerkAuth;