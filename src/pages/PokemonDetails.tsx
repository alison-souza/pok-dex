import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [species, setSpecies] = useState<any>(null);
  const [translatedCuriosity, setTranslatedCuriosity] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);

      const res2 = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const speciesData = await res2.json();
      setSpecies(speciesData);
    }

    load();
  }, [id]);

  // Depois que species é carregado, traduz curiosidade automaticamente
  useEffect(() => {
    async function translateCuriosity() {
      if (!species) return;

      // Curiosidade original
      const flavor =
        species.flavor_text_entries.find(
          (entry: any) => entry.language.name === "pt"
        ) ||
        species.flavor_text_entries.find(
          (entry: any) => entry.language.name === "en"
        );

      const curiosity = flavor
        ? flavor.flavor_text.replace(/\f/g, " ")
        : "Nenhuma curiosidade encontrada.";

      // Se já estiver em PT-BR, só salva
      if (flavor?.language.name === "pt") {
        setTranslatedCuriosity(curiosity);
        return;
      }

      // Traduz usando API MyMemory
      try {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            curiosity
          )}&langpair=en|pt-br`
        );

        const json = await response.json();

        const translated = json?.responseData?.translatedText || curiosity;

        setTranslatedCuriosity(translated);
      } catch (error) {
        setTranslatedCuriosity(curiosity);
      }
    }

    translateCuriosity();
  }, [species]);

  if (!pokemon || !species || !translatedCuriosity) {
    return <p className="text-center mt-20 text-gray-300">Carregando...</p>;
  }

  // Região padrão para todos os 151 iniciais
  const region = "Kanto";

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <Link
        to="/"
        className="text-cyan-400 hover:text-cyan-300 transition mb-6 self-start"
      >
        ← Voltar
      </Link>

      <div className="card-glass neon-border p-8 rounded-2xl shadow-xl max-w-xl w-full">
        <div className="flex flex-col items-center text-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32 drop-shadow-[0_0_12px_rgba(0,255,255,0.5)]"
          />

          <h1 className="text-4xl neon-text font-bold capitalize mt-4 tracking-wide">
            {pokemon.name}
          </h1>

          <p className="text-cyan-400 text-sm mt-1">ID: #{pokemon.id}</p>

          <p className="mt-2 text-gray-300 text-sm">
            Região:{" "}
            <span className="text-cyan-400 font-semibold">{region}</span>
          </p>

          <div className="mt-8 w-full">
            <h2 className="text-xl font-semibold text-gray-300 mb-3">Tipos</h2>
            <div className="flex justify-center gap-3">
              {pokemon.types.map((t: any) => (
                <span
                  key={t.type.name}
                  className="px-4 py-1 rounded-full bg-cyan-700/40 text-cyan-300 capitalize border border-cyan-500/40"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 w-full">
            <h2 className="text-xl font-semibold text-gray-300 mb-3">Status</h2>
            <div className="space-y-3">
              {pokemon.stats.map((s: any) => (
                <div
                  key={s.stat.name}
                  className="flex justify-between p-2 rounded-lg bg-white/5 border border-white/10"
                >
                  <span className="capitalize text-gray-200">
                    {s.stat.name}
                  </span>
                  <span className="font-bold text-cyan-400">{s.base_stat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 w-full">
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">
              Curiosidade
            </h2>
            <p className="text-gray-300 bg-white/5 p-4 rounded-xl border border-white/10 leading-relaxed">
              {translatedCuriosity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
