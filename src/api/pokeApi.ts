import axios from "axios";
import type { PokemonListResponse, PokemonDetail } from "../types";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 10000,
});

export const PokeApiService = {
  async getPokemonList(limit = 151, offset = 0): Promise<PokemonListResponse> {
    const resp = await api.get<PokemonListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`
    );
    return resp.data;
  },

  async getPokemonByName(nameOrId: string | number): Promise<PokemonDetail> {
    const resp = await api.get<PokemonDetail>(`/pokemon/${nameOrId}`);
    return resp.data;
  },
};
