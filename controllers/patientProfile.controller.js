import {
    getPatientProfileService,
    updatePatientProfileService,
    updateContactInfoService,
    updatePasswordService,
} from "../services/patientProfile.service.js";
import bcrypt from "bcryptjs";

// -------------------- GET PROFILE --------------------
export const getPatientProfile = async (req, res) => {
    try {
        const id = req.user.id;

        const profile = await getPatientProfileService(id);

        return res.status(200).json({
            message: "Profile fetched successfully",
            profile,
        });
    } catch (error) {
        console.error("Get Profile Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

// -------------------- UPDATE FULL PROFILE --------------------
export const updatePatientProfile = async (req, res) => {
    try {
        const id = req.user.id;

        const updated = await updatePatientProfileService(id, req.body);

        return res.status(200).json({
            message: "Profile updated successfully",
            updated,
        });
    } catch (error) {
        console.error("Update Profile Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

// -------------------- UPDATE CONTACT INFO --------------------
export const updateContactInfo = async (req, res) => {
    try {
        const id = req.user.id;
        const { email, phone } = req.body;

        const updated = await updateContactInfoService(id, email, phone);

        return res.status(200).json({
            message: "Contact info updated successfully",
            updated,
        });
    } catch (error) {
        console.error("Update Contact Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

// -------------------- UPDATE PASSWORD --------------------
export const updatePassword = async (req, res) => {
    try {
        const id = req.user.id;
        const { current_password, new_password } = req.body;

        const updated = await updatePasswordService(id, current_password, new_password);

        return res.status(200).json({
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error("Update Password Error:", error);
        return res.status(500).json({ message: error.message });
    }
};


