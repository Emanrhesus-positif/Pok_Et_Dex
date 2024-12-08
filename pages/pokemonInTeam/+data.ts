// https://vike.dev/data
import { pokemons } from "../../database/pokemonItems";
import type { PageContextServer } from "vike/types";

export type Data = {
  pokemon: { name: string }[];
};

export default async function data(_pageContext: PageContextServer): Promise<Data> {
  return { pokemon: pokemons };
}
