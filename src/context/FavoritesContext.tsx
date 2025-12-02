import React, { createContext, useContext, useEffect, useState } from "react";

type Favorite = {
  name: string;
  id: number;
  image: string;
};

type FavoritesContextValue = {
  favorites: Favorite[];
  toggleFavorite: (p: Favorite) => void;
  isFavorite: (name: string) => boolean;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "pokedex:favorites";

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setFavorites(JSON.parse(raw));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(p: Favorite) {
    const exists = favorites.find((f) => f.name === p.name);
    if (exists) {
      setFavorites((prev) => prev.filter((f) => f.name !== p.name));
    } else {
      if (favorites.length >= 6) {
        alert("Você só pode favoritar até 6 Pokémon no Time!");
        return;
      }
      setFavorites((prev) => [...prev, p]);
    }
  }

  function isFavorite(name: string) {
    return favorites.some((f) => f.name === name);
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  return ctx;
}
