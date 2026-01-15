import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import "./config/database.js";

import patientProfileRoutes from "./routes/patientProfile.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/patient/profile", patientProfileRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on ${PORT}`);
});


