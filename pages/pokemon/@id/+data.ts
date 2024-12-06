// https://vike.dev/data

import type { PageContextServer } from "vike/types";
import type { PokemonDetails } from "../types.js";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  // https://vike.dev/useConfig
  const config = useConfig();

  console.log(pageContext.routeParams.id);
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pageContext.routeParams.id}`);
  let pokemon = (await response.json()) as PokemonDetails;

  config({
    // Set <title>
    title: `${pokemon.name}`,
  });
  // We remove data we don't need because the data is passed to
  // the client; we should minimize what is sent over the network.
  console.log("=======================BEFORE MINIMIZE=================", pokemon);

  return pokemon;
};
