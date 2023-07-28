import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";

const Home = function () {
  const [recipes, setRecipe] = useState([]);
  const [recipesId, setRecipesId] = useState([]);
  console.log(recipesId);
  const fetchRecipe = async () => {
    try {
      const response = await axios.get("http://localhost:8081/recipes");
      setRecipe(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRecipesId = async () => {
    try {
      const userId = window.localStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:8081/recipes/recipe-ids/${userId}`
      );
      console.log("response: ", response);
      setRecipesId([...recipesId, ...response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipe();
    fetchRecipesId();
  }, []);

  const onClick = async (recipeId) => {
    try {
      const userId = window.localStorage.getItem("userId");

      if (!userId) {
        alert("You need to login to save a recipe!");
        return;
      }

      const response = await axios.put(`http://localhost:8081/recipes/`, {
        userId,
        recipeId,
      });
      console.log(response.data);
      fetchRecipesId();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-20">
      <h1 className="font-bold font-mono text-3xl">Recipes</h1>
      {recipes.map((recipe) => (
        <RecipeCard
          recipe={recipe}
          onClick={onClick}
          recipesId={recipesId}
          showBtn={true}
        ></RecipeCard>
      ))}
    </div>
  );
};

export default Home;
