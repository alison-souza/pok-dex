import React from "react";
import { useFavorites } from "../context/FavoritesContext";

export const Header: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
  const { favorites } = useFavorites();
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pokedéx</h1>
        <p className="text-sm text-gray-500">151 Pokémons originais</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <div className="text-xs text-gray-500">Time</div>
          <div className="font-medium">{favorites.length} / 6</div>
        </div>
      </div>
    </header>
  );
};
