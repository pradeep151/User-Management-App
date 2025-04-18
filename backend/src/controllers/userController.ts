import { Request, Response } from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../modeles/User";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const postUser = async (req: Request, res: Response) => {
  const { name, email, phone, dob, gender, country } = req.body;
  try {
    const user = await createUser(
      name,
      email,
      phone,
      dob,
      gender,
      country
    );
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone, dob, gender, country } = req.body;
  try {
    const user = await updateUser(
      parseInt(id),
      name,
      email,
      phone,
      dob,
      gender,
      country
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteUser(parseInt(id));
    res.status(204).end();
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user" });
  }
};
