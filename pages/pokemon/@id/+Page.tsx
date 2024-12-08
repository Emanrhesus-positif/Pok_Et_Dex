import React, {useState, useEffect} from "react";
import { useData } from "vike-react/useData";
import { Resume } from "./Resume";
import { Abilities } from "./Abilities";
import { Stats } from "./Stats";
import { Evolutions } from "./Evolutions";
import type { Data } from "./+data.js";

export default function Page() {
	const pokemon = useData<Data>();
	const [content, setContent] = useState("Resume");
	const [pokemonInfo, setPokemonInfo] = useState(<Resume/>);
	
	useEffect(() => {
		setPokemonInfo(
			content === "Resume" ? <Resume/> :
			content === "abilities" ? <Abilities/> :
			content === "stats" ? <Stats/> :
			content === "evolutions" ? <Evolutions/> : <Resume/>
		);

	}, [content]);

	return (
		<div key={pokemon.id}>
			<section className="sideBar">
				<button onClick={() => setContent("Resume")}> Resume </button>
				<button onClick={() => setContent("abilities")}> Abilities </button>
				<button onClick={() => setContent("stats")}> Stats </button>
				<button onClick={() => setContent("evolutions")}> Evolutions </button>
			</section>
			<section className="mainContent">
				{pokemonInfo}
			</section>
		</div >
	);
}
