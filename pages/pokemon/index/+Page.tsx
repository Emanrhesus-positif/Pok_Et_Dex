import React, { useEffect, useState } from "react";
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

		//filter from currentPokemons, if search is empty, search from all pokemons on a new search on the api
		if (searchString === "") {
			setReset(true);
			changeOffset(0);
		}
		else if (searchString !== "" && searchString.length > 2) {
			searchPokemonData(searchString);
		};
	};

	return (
		<>
			<div className="listWrapper p-4 bg-gray-100 rounded-lg shadow-md">
				<section className="searchNavWrapper flex items-center gap-4 mb-6">
					<button
						onClick={() => setReset(true)}
						className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
					>
						Reset
					</button>
					<input
						id="searchInput"
						type="text"
						placeholder="Filtrer un Pokémon"
						className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						onClick={() =>
							handleSearch((document.getElementById("searchInput") as HTMLInputElement).value)
						}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
					>
						Search
					</button>
					<button
						onClick={() => handleOther(2)}
						className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
					>
						Previous
					</button>
					<button
						onClick={() => handleOther(1)}
						className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
					>
						Next
					</button>
				</section>
				<section className="articlesWrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{currentPokemons.pokemon.map((item) => (
						<article
							key={item.id}
							className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
						>
							<p className="text-sm text-gray-500 mb-2">ID: {item.id}</p>
							<a
								href={`/pokemon/${item.id}`}
								className="text-lg font-bold text-blue-600 hover:underline"
							>
								{item.name}
							</a>
							<p className="text-sm text-gray-400">{item.url}</p>
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
								alt={item.name}
								className="w-20 h-20 mt-4"
							/>
						</article>
					))}
				</section>
			</div>


		</>
	);
}