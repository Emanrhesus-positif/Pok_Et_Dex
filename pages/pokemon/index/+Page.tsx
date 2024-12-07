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
	const [search, setSearch] = useState("");

	//corriger : l'api est appellée 2 fois au reset ??? (passage de 2 fois 30 pokémons)
	//corriger : l'api enregistre tous les pokémons au lancement ??? (passage de 1000 + id pokémons)
	useEffect(() => {
		setReset(false);
		const fetchData = async () => {
		  setCurrentPokemons(await extendedData(limit, offset));
		};
		fetchData();
	  }, [offset, reset]);
	  
	useEffect(() => {
		const fetchData = async () => {
			setCurrentPokemons(await searchPokemon(search, pokemons.count));
		}
		fetchData();
	}, [search]);

	const handleOther = async (operator: number, offset: number) => {
		if (operator === 1 && offset <= pokemons.count) {
			setOffset(offset + 30);
		} else if (operator === 2 && offset >= 30) {
			setOffset(offset - 30);
		}
	};
	const handleReset = async () => {
		//needs 
	}

	const handleSearch = async (searchString: string) => {
		//filter from currentPokemons, if search is empty, search from all pokemons on a new search on the api
		if (searchString === "") {
			setReset(true);
		}
		else if (searchString !== "" && searchString.length > 2) {
			setSearch(searchString);
		};	
	};

	return (
		<>
			<div className="listWrapper">
				<section className="searchNavWrapper">
				<button onClick={() => setReset(true)}>Reset</button>
					<input onChange={(event) => handleSearch(event.target.value)} type="text" placeholder="Filtrer un pokemon" />
					<button onClick={() => handleOther(2, offset)}>Previous</button>
					<button onClick={() => handleOther(1, offset)}>Next</button>
					
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