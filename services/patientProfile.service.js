import pool from "../config/database.js";
import bcrypt from "bcryptjs";

// -------------------- GET PROFILE --------------------
export const getPatientProfileService = async (id) => {
    const query = `
        SELECT id, full_name, email, phone, dob, gender, 
               pref_sms, pref_email, pref_promo, created_at
        FROM patients 
        WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

// -------------------- UPDATE FULL PROFILE --------------------
export const updatePatientProfileService = async (id, data) => {
    const { full_name, dob, gender, pref_sms, pref_email, pref_promo } = data;

    const query = `
        UPDATE patients SET 
            full_name = $1,
            dob = $2,
            gender = $3,
            pref_sms = $4,
            pref_email = $5,
            pref_promo = $6
        WHERE id = $7
        RETURNING *
    `;
    const values = [full_name, dob, gender, pref_sms, pref_email, pref_promo, id];

    const result = await pool.query(query, values);
    return result.rows[0];
};

// -------------------- UPDATE CONTACT INFO --------------------
export const updateContactInfoService = async (id, email, phone) => {
    const query = `
        UPDATE patients 
        SET email = $1, phone = $2 
        WHERE id = $3
        RETURNING id, email, phone
    `;
    const result = await pool.query(query, [email, phone, id]);
    return result.rows[0];
};

// -------------------- UPDATE PASSWORD --------------------
export const updatePasswordService = async (id, current_password, new_password) => {
    const userQuery = `SELECT password FROM patients WHERE id=$1`;
    const userResult = await pool.query(userQuery, [id]);

    if (userResult.rows.length === 0) {
        throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(
        current_password,
        userResult.rows[0].password
    );

    if (!passwordMatch) {
        throw new Error("Current password is incorrect");
    }

    const hashed = await bcrypt.hash(new_password, 10);

    const updateQuery = `
        UPDATE patients SET password=$1 WHERE id=$2
    `;
    await pool.query(updateQuery, [hashed, id]);

    return true;
};



