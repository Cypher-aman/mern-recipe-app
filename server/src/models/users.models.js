import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipes" }],
});

const Users = mongoose.model("Users", userSchema);

export default Users;
