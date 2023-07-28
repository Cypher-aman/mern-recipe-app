import { Schema } from "mongoose";
import mongoose from "mongoose";

const recipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String }],
  instructions: { type: String, required: true },
  imageURL: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Recipes = mongoose.model("Recipes", recipeSchema);

export default Recipes;
