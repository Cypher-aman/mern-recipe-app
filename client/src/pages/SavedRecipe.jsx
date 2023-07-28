import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SavedRecipe = function () {
  const [recipes, setRecipes] = useState([]);
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
  const navigate = useNavigate();

  const getSavedRecipe = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/recipes/saved-recipes/${userId}`
      );
      setRecipes(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userId) {
      alert("You need to login to see saved recipe");
      return;
    }
    getSavedRecipe();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-20">
      <h1 className="font-bold font-mono text-3xl">Saved Recipe</h1>
      {recipes?.map((recipe) => (
        <RecipeCard recipe={recipe}></RecipeCard>
      ))}
    </div>
  );
};

export default SavedRecipe;
