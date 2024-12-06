// https://vike.dev/data
import { pokemons } from "../../database/pokemons";
import type { PageContextServer } from "vike/types";

export type Data = {
  pokemon: { text: string }[];
};

export default async function data(_pageContext: PageContextServer): Promise<Data> {
  return { pokemon: pokemons };
}
