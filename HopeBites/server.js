const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const volunteerRoutes = require("./routes/volunteerRoutes");
const donorRoutes = require("./routes/donorsRoutes");
const donationRoutes = require("./routes/donationsRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/volunteer", volunteerRoutes); // Volunteer routes
app.use("/api/donors", donorRoutes);
app.use("/api/donations", donationRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
