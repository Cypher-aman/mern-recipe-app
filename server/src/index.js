import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {} from "dotenv/config";
import userRouter from "./routes/users.routes.js";
import recipeRouter from "./routes/recipes.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

try {
  await mongoose.connect(
    `mongodb+srv://aman-rai:${process.env.MONGO_PASSWORD}@recipes.vd5akyl.mongodb.net/recipes?retryWrites=true&w=majority`
  );
} catch (err) {
  console.log(err);
}

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

app.listen(8081, () => console.log("Server started!"));
