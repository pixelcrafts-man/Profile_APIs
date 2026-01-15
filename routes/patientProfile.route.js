import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";

import {
    getPatientProfile,
    updatePatientProfile,
    updateContactInfo,
    updatePassword,
} from "../controllers/patientProfile.controller.js";

const router = express.Router();

// GET PROFILE
router.get("/", verifyToken, getPatientProfile);

// UPDATE FULL PROFILE (name, gender, dob, prefs)
router.put("/", verifyToken, updatePatientProfile);

// UPDATE CONTACT INFO (email + phone)
router.put("/contact", verifyToken, updateContactInfo);

// UPDATE PASSWORD
router.put("/password", verifyToken, updatePassword);

export default router;



