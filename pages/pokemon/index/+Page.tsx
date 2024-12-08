import React, {useEffect, useState} from "react";
import { useData } from "vike-react/useData";
import { extendedData, searchPokemon } from "./+data.js";
import type { Data } from "./+data.js";

export default function Page() {
	const limit = 30;
	const [offset, setOffset] = useState(0);
	const [reset, setReset] = useState(false);

	const pokemons = useData<Data>();
	const [currentPokemons, setCurrentPokemons] = useState(pokemons);

	const changeOffset = async (offset: number) => {
		const fetchData = async () => {
		  setCurrentPokemons(await extendedData(limit, offset));
		};
		fetchData();
	}
	const searchPokemonData = async (search: string) => {
		const fetchData = async () => {
			setCurrentPokemons(
				await searchPokemon(search)
			);
		}
		fetchData();
	}

	const handleOther = async (operator: number) => {
		if (operator === 1 && offset <= pokemons.count) {
			let newOffset = offset + 30;
			setOffset(newOffset);
			changeOffset(newOffset);
		} else if (operator === 2 && offset >= 30) {
			let newOffset = offset - 30;
			setOffset(newOffset);
			changeOffset(newOffset);
		}
	};
	const handleReset = async () => {
		//needs 
	}

	const handleSearch = async (searchString: string) => {
		let searchPhrase = searchString.charAt(0).toUpperCase() + searchString.slice(1);

		//filter from currentPokemons, if search is empty, search from all pokemons on a new search on the api
		if (searchString === "") {
			setReset(true);
			changeOffset(0);
		}
		else if (searchString !== "" && searchString.length > 2) {
			searchPokemonData(searchPhrase);
		};	
	};

	return (
		<>
			<div className="listWrapper">
				<section className="searchNavWrapper">
				<button onClick={() => setReset(true)}>Reset</button>
					<input id="searchInput" type="text" placeholder="Filtrer un pokemon" />
					<button onClick={() => handleSearch((document.getElementById('searchInput') as HTMLInputElement).value)}>Search</button>
					<button onClick={() => handleOther(2)}>Previous</button>
					<button onClick={() => handleOther(1)}>Next</button>
					
				</section>
				<section className="articlesWrapper">
					{currentPokemons.pokemon.map((item) => (
						<article>
							<p></p>
							<a href={`/pokemon/${item.id}`}>{item.name}</a> ({item.url})
							<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} alt={item.name} />
						</article>
					))}
				</section>
			</div>

		</>
	);
}