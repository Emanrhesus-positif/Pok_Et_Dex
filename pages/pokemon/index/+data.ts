// https://vike.dev/data

import type { Pokemon, PokemonDetails } from "../types.js";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
	// https://vike.dev/useConfig
	const config = useConfig();

	const limitoffset = `?limit=30&offset=30`;

	const response = await fetch(`https://pokeapi.co/api/v2/pokemon${limitoffset}`);
	const pokemonsData = (await response.json()) as PokemonDetails[];

	config({
		// Set <title>
		title: `${pokemonsData.length} pokemons`,
	});

	// We remove data we don't need because the data is passed to the client; we should
	// minimize what is sent over the network.
	const pokemons = { count: pokemonsData.count, pokemon: minimize(pokemonsData) };
	return pokemons;
};

export const extendedData = async (limit: number, offset: number) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
	const pokemonsData = (await response.json()) as PokemonDetails[];

	const pokemons = { count: pokemonsData.count, pokemon: minimize(pokemonsData) };

	return pokemons;
}
export const searchPokemon = async (searchString: string, max: number) => {
	let extractedPokemons: PokemonDetails[] = [];
	const searchUrl = `https://pokeapi.co/api/v2/pokemon-species`;
	const response = await fetch({searchUrl});
	const countData = (await response.json());

	for(let i = 1; i <= countData.count; i++) {
	const response = await fetch(`${searchUrl}/${i}`);
	const languageData = (await response.json());
	console.log(languageData);
	}
	// languageData.names.filter((languages) => languages.language.includes("fr")) && languageData.names.filter((languages) => languages.name.includes(searchString))};

	
	//extractedPokemons = {results: pokemonsData.results.filter((pokemon) => pokemon.name.includes(searchString))};
	const pokemons="3";
	// const pokemons = { count: max, pokemon: minimize(extractedPokemons) };
	return pokemons;

};

function minimize(pokemons: PokemonDetails[]): Pokemon[] {
	return pokemons.results.map((pokemon) => {
		const id = pokemon.url.split("/")[6];
		//check what transits in this function and how many times
		const { name, url } = pokemon;
		return { name, url, id };
	});
}
