import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// use routes
app.use("/api/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
