import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";

export default function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(null);

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (meal) => {
    const exists = favorites.find((f) => f.idMeal === meal.idMeal);
    let updated;
    if (exists) {
      updated = favorites.filter((f) => f.idMeal !== meal.idMeal);
    } else {
      updated = [...favorites, meal];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Debounced + cancelable search
  useEffect(() => {
    if (!query) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    const handler = setTimeout(() => {
      if (controllerRef.current) controllerRef.current.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
        { signal: controller.signal }
      )
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data.meals || []);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error(err);
            setLoading(false);
          }
        });
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="p-6">
      <SearchBar query={query} setQuery={setQuery} />

      {loading && <p className="text-center mt-4">Loading...</p>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
        {recipes.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            meal={meal}
            isFavorite={favorites.some((f) => f.idMeal === meal.idMeal)}
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
