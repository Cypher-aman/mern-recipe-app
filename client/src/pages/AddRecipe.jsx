import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRecipe = function () {
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageURL: "",
    cookingTime: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const onChangeIng = (e, index) => {
    const { value } = e.target;
    const newIng = [...recipe.ingredients];
    newIng[index] = value;
    setRecipe({ ...recipe, ingredients: newIng });
  };

  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userOwner = window.localStorage.getItem("userId");

      if (!userOwner) {
        alert("Login first!");
        return;
      }

      const res = await axios.post("http://localhost:8081/recipes", {
        ...recipe,
        userOwner,
      });

      console.log(res);
      alert("Recipe added successfully!");

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col bg-blue-200 min-h-screen justify-center items-center">
      <h1 className="font-bold m-5 text-2xl">Add Recipe</h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-[440px]  gap-2 p-2 mb-10"
      >
        <label htmlFor="name">Name</label>
        <input
          value={recipe.name}
          onChange={onChange}
          type="text"
          name="name"
          className="border border-black outline-none p-1 rounded-sm "
        />
        <label htmlFor="name">Ingredients</label>

        {recipe.ingredients.map((ing, i) => {
          return (
            <input
              onChange={(e) => onChangeIng(e, i)}
              key={i}
              type="text"
              name="ingredients"
              className="border border-black outline-none p-1 rounded-sm "
            />
          );
        })}
        <button
          onClick={addIngredients}
          type="button"
          className="border border-black p-1 rounded-sm text-white bg-black"
        >
          Add Ingredients
        </button>
        <label htmlFor="name">Instructions</label>
        <input
          value={recipe.instructions}
          onChange={onChange}
          type="text"
          name="instructions"
          className="border border-black outline-none p-1 rounded-sm "
        />
        <label htmlFor="name">Image Url</label>
        <input
          value={recipe.imageURL}
          onChange={onChange}
          type="text"
          name="imageURL"
          className="border border-black outline-none p-1 rounded-sm "
        />
        <label htmlFor="name">Cooking Time</label>
        <input
          value={recipe.cookingTime}
          onChange={onChange}
          type="number"
          name="cookingTime"
          className="border border-black outline-none p-1 rounded-sm "
        />
        <button
          type="submit"
          className="border border-black p-1 rounded-sm text-white bg-red-600"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
