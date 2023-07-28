import Users from "../models/users.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import {} from "dotenv/config.js";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const isUserExists = await Users.findOne({ username }).exec();

  if (isUserExists) {
    return res.json({ message: "User already exists!" });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = new Users({ username, password: hashedPass });
  await user.save();

  res.json({ message: "User created successfully. Now Login to continue!" });
});

userRouter.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ username });

  if (!user) return res.json({ message: "User does not exists!" });

  const validatePass = await bcrypt.compare(password, user.password);

  if (!validatePass) return res.json({ message: "Password incorrect!" });

  const token = jwt.sign({ username }, process.env.SECRET_KEY);

  res.json({ token: token, userId: user._id });
});

export default userRouter;
