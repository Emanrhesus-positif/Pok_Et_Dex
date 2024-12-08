import { PrismaClient } from "@prisma/client";
import type { PageContextServer } from "vike/types";
import type { Pokemon, PokemonDetails } from "../pokemon/types";

const prisma = new PrismaClient();

export type Data = Awaited<ReturnType<typeof data>>;

export default async function data(_pageContext: PageContextServer) {
    const pokemons = await prisma.pokemon.findMany();
  return { pokemons };
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