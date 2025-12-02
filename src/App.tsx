import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Detail } from "./pages/PokemonDetails";
import { FavoritesProvider } from "./context/FavoritesContext";

export const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
};

export default App;
