// https://vike.dev/data

import type { Pokemon, PokemonDetails } from "../types.js";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
	// https://vike.dev/useConfig
	const config = useConfig();

  const limitoffset = `?limit=30&offset=0`;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species${limitoffset}`);
  const pokemonsData = await response.json();
  const countData = pokemonsData.count;
  let extractedPokemons: { id: number; name: string }[] = [];

  for (let i = 1; i <= 30; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
    const languageData = await response.json();

    const filteredNames = languageData.names.filter(
      (nameObj: { language: { name: string }; name: string }) => nameObj.language.name === "fr"
    );

    if (filteredNames.length > 0) {
      extractedPokemons.push({
        id: i,
        name: filteredNames[0].name,
      });
    }
  }

  config({
    // Set <title>
    title: `${extractedPokemons.length} pokemons`,
  });

  const pokemons = { count: countData, pokemon: minimize(extractedPokemons) };
  return pokemons;
};

export const extendedData = async (limit: number, offset: number) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species?limit=${limit}&offset=${offset}`);
  const pokemonsData = await response.json();
  const countData = pokemonsData.count;
  let extractedPokemons: { id: number; name: string }[] = [];

  for (let i = 1; i <= 30; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i+offset}`);
    const languageData = await response.json();

    const filteredNames = languageData.names.filter(
      (nameObj: { language: { name: string }; name: string }) => nameObj.language.name === "fr"
    );

    if (filteredNames.length > 0) {
      extractedPokemons.push({
        id: i+offset,
        name: filteredNames[0].name,
      });
    }
  }

  const pokemons = { count: countData, pokemon: minimize(extractedPokemons) };
  return pokemons;
}
export const searchPokemon = async (searchString: string) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/`);
	const pokemonData = (await response.json());
	const countData = pokemonData.count;
	let extractedPokemons: PokemonDetails[] = [];

	for (let i = 1; i <= countData; i++) {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
		const languageData = await response.json();
	
		let filteredNames = languageData.names.filter(
		  (nameObj) => nameObj.language.name === "fr" && nameObj.name.includes(searchString)
		);
	
		if (filteredNames.length > 0) {
		  extractedPokemons.push({
			id: i,
			name: filteredNames[0].name,
		  });
		}
	  }
	
	  console.log(extractedPokemons);
	  let extractedPokemons2 = { count : countData, pokemon: minimize(extractedPokemons)};
	  return extractedPokemons2;

};

function minimize(pokemons: PokemonDetails[]): Pokemon[] {
	return pokemons.map((pokemon) => {
		const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon.id;
		const { name, id } = pokemon;
		return { name, url, id };
	});
}