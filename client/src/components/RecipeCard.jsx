const RecipeCard = function ({ recipe, onClick, recipesId, showBtn = false }) {
  return (
    <div className="flex flex-col justify-center p-4 w-max rounded-sm border border-black">
      <h1 className="font-bold font-mono mb-2 text-lg">{recipe.name}</h1>
      <img src={`${recipe.imageURL}`} className="w-60 h-fit"></img>
      <ul className="list-disc">
        <h2 className="text-base font-semibold font-mono">Ingredients:</h2>
        {recipe.ingredients.map((ing) => (
          <li className="text-sm list-disc list-inside">{ing}</li>
        ))}
      </ul>
      <h3 className="text-base font-semibold mt-2 font-mono">Instructions:</h3>
      <p className="text-sm">{recipe.instructions}</p>
      <h3 className="text-base font-semibold mt-2 font-mono">Cooking Time</h3>
      <p className="text-sm">{recipe.cookingTime}</p>
      {showBtn ? (
        recipesId.includes(recipe._id) ? (
          <button
            disabled
            className="bg-gray-500 text-white p-1 px-2 rounded-sm mt-2"
          >
            Saved
          </button>
        ) : (
          <button
            onClick={() => onClick(recipe._id)}
            className="bg-black text-white p-1 px-2 rounded-sm mt-2"
          >
            Save
          </button>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default RecipeCard;
