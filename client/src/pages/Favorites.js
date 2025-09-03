import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (meal) => {
    const updated = favorites.filter((f) => f.idMeal !== meal.idMeal);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">⭐ Favorites</h1>
      {favorites.length === 0 && <p>No favorite recipes yet.</p>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            meal={meal}
            isFavorite
            onToggleFavorite={() => toggleFavorite(meal)}
            onOpen={() => setSelectedRecipe(meal)}
          />
        ))}
      </div>

      {selectedRecipe && (
        <RecipeModal
          meal={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
