import React from "react";

export default function RecipeCard({ meal, onOpen, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
        <div class="grid grid-cols-2">
            <div class="bg-blue-500 p-4">
                <div className="p-4">
                    <h2 className="text-lg font-semibold cursor-pointer" onClick={onOpen}>
                        {meal.strMeal}
                    </h2>
                    <button
                        onClick={onToggleFavorite}
                        className="mt-2 text-sm bg-yellow-200 px-3 py-1 rounded-lg hover:bg-yellow-300"
                    >
                    {isFavorite ? "★ Unfavorite" : "☆ Favorite"}
                    </button>

                    <em className="text-sm text-gray-600">
                        {meal.strCategory} {meal.strArea ? `• ${meal.strArea}` : ""}
                    </em>
                </div>
            </div>
            <div class="bg-green-500 p-4">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={onOpen}
                    width={100}
                />
            </div>
        </div>

        
      {/* 
       */}
    </div>
  );
}
