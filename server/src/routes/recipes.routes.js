import Recipes from "../models/recipes.models.js";
import Users from "../models/users.models.js";
import { Router } from "express";

const router = Router();

// Create Recipe
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipes(req.body);

    await recipe.save();

    res.json(recipe);
  } catch (err) {
    console.error(err);
  }
});

// Get all recipe
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipes.find();

    res.json(recipes);
  } catch (err) {
    console.log(err);
  }
});

// Save recipe
router.put("/", async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    const user = await Users.findOne({ _id: userId });

    user.savedRecipes.push(recipeId);
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Get saved recipe's ids
router.get("/recipe-ids/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ _id: id });

    const recipesId = user.savedRecipes;

    res.json(recipesId);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

// Get saved recipe
router.get("/saved-recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ _id: id });
    const recipes = await Recipes.find({ _id: { $in: user.savedRecipes } });

    res.json(recipes);
  } catch (err) {
    console.error("error: ", err);
    res.json(err);
  }
});

export default router;
