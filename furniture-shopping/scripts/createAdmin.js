import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { connectDB } from "../lib/db.js";

const run = async () => {
  await connectDB();

  await User.create({
    name: "Admin",
    email: "admin@site.com",
    password: await bcrypt.hash("admin123", 10),
    role: "admin",
  });

  console.log("Admin created");
  process.exit();
};

run();