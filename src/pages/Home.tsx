import React, { useEffect, useMemo, useState } from "react";
import { PokemonCard } from "../components/PokemonCard";
import { api } from "../services/api";

type ApiPokemon = { name: string; url: string };

export function Home() {
  const [pokemons, setPokemons] = useState<ApiPokemon[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState(false);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        const res = await api.get("pokemon?limit=151");
        setPokemons(res.data.results);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  useEffect(() => {
    async function loadTypes() {
      try {
        const res = await api.get("type");
        const names: string[] = res.data.results.map((r: any) => r.name);
        setTypes(names);
      } catch (err) {
        console.error(err);
      }
    }
    loadTypes();
  }, []);

  const [typePokemonSet, setTypePokemonSet] = useState<Set<string> | null>(
    null
  );

  useEffect(() => {
    if (selectedType === "all") {
      setTypePokemonSet(null);
      return;
    }

    let cancel = false;

    async function loadTypeList() {
      setLoadingType(true);
      try {
        const res = await api.get(`type/${selectedType}`);
        const pok: string[] = res.data.pokemon.map((p: any) => p.pokemon.name);
        if (!cancel) setTypePokemonSet(new Set(pok));
      } catch (err) {
        console.error(err);
        if (!cancel) setTypePokemonSet(null);
      } finally {
        if (!cancel) setLoadingType(false);
      }
    }

    loadTypeList();
    return () => {
      cancel = true;
    };
  }, [selectedType]);

  const filtered = useMemo(() => {
    let arr = pokemons;
    if (typePokemonSet) {
      arr = arr.filter((p) => typePokemonSet.has(p.name));
    }
    if (search.trim()) {
      arr = arr.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return arr;
  }, [pokemons, typePokemonSet, search]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER CENTRALIZADO */}
        <header className="flex flex-col items-center justify-center mb-6 gap-4">
          <h1 className="text-4xl font-bold neon-text text-center">Pokedéx</h1>
        </header>

        {/* SEARCH + FILTER CENTRALIZADOS */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <input
            className="input-futuristic px-4 py-2 rounded-xl w-full max-w-md text-center"
            placeholder="Procure o Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex items-center gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-futuristic px-3 py-2 rounded-xl"
            >
              <option value="all">Todos os tipos</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {loadingType && (
              <span className="text-sm small-muted">Buscando tipo…</span>
            )}
          </div>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="text-center text-cyan-300 py-10">
            Carregando Pokémons…
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filtered.map((p) => {
              const id = Number(p.url.split("/").filter(Boolean).pop());
              const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

              return (
                <PokemonCard key={id} id={id} name={p.name} image={image} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
