// controllers/userController.js
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const isValid = await comparePassword(password, user.password);
  if (!isValid) return res.status(401).json({ error: "Invalid password" });

  const token = generateToken(user.id);
  res.json({ token });
});

// Current user
export const currentUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
  });
  res.json(user);
});
