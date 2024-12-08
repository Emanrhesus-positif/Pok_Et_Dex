// https://vike.dev/data

import type { PageContextServer } from "vike/types";
import type { PokemonDetails } from "../types.js";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {

  console.log(pageContext.routeParams.id);
  
  // Récupérer les détails du Pokémon
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pageContext.routeParams.id}`);
  let pokemon = (await response.json()) as PokemonDetails;

  // Récupérer les noms en français à partir de l'API pokemon-species
  const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pageContext.routeParams.id}`);
  const speciesData = await speciesResponse.json();

  // Filtrer les noms pour trouver la version française
  const nameInFrench = speciesData.names.find(
    (nameObj: { language: { name: string }; name: string }) => nameObj.language.name === "fr"
  )?.name;

  // Remplacer le nom par la version française si elle existe
  if (nameInFrench) {
    pokemon.name = nameInFrench;
  }

  // We remove data we don't need because the data is passed to
  // the client; we should minimize what is sent over the network.

  return pokemon;
};
