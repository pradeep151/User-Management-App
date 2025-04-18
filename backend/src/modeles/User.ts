import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const createUser = async (
  name: string,
  email: string,
  phone: number,
  dob: string,
  gender: string,
  country: string
) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, phone, dob, gender, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, email, phone, dob, gender, country]
  );
  return result.rows[0];
};

export const updateUser = async (
  id: number,
  name: string,
  email: string,
  phone: number,
  dob: string,
  gender: string,
  country: string
) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2, phone = $3, dob = $4, gender = $5, country = $6 WHERE id = $7 RETURNING *",
    [name, email, phone, dob, gender, country, id]
  );
  return result.rows[0];
};

export const deleteUser = async (id: number) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return id;
};
