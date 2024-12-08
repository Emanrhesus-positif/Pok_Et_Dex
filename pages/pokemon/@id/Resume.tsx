import { useState, useEffect } from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export const Resume = () => {
	const pokemon = useData<Data>();
	const [activeSprite, setActiveSprite] = useState("default");
	const [frontSprite, setFrontSprite] = useState(pokemon.sprites.front_default);
	const [backSprite, setBackSprite] = useState(pokemon.sprites.back_default);

	useEffect(() => {
		switch (activeSprite) {
			case "default":
				setFrontSprite(pokemon.sprites.front_default);
				setBackSprite(pokemon.sprites.back_default);
				break;
			case "shiny":
				setFrontSprite(pokemon.sprites.front_shiny);
				setBackSprite(pokemon.sprites.back_shiny);
				break;
			case "female":
				setFrontSprite(pokemon.sprites.front_female);
				setBackSprite(pokemon.sprites.back_female);
				break;
			case "shiny_female":
				setFrontSprite(pokemon.sprites.front_shiny_female);
				setBackSprite(pokemon.sprites.back_shiny_female);
				break;
		}
	} , [activeSprite]);

	return (
		<div key="">
			<section className="titleImage">
				<h1 className="pokemonName">{pokemon.name}</h1>
				<img className="frontSprite" src={frontSprite} alt={pokemon.name} />
				<img className="backSprite" src={backSprite} alt={pokemon.name} />
				<button onClick={() => setActiveSprite("default")}>Default</button>
				<button onClick={() => setActiveSprite("shiny")}>Shiny</button>
				{pokemon.sprites.front_female != null ? (
					<button onClick={() => setActiveSprite("female")}>Femelle</button>
				) : null}
				{pokemon.sprites.front_shiny_female != null ? (
					<button onClick={() => setActiveSprite("shiny_female")}>Shiny female</button>
				) : null}
			</section>
			<section className="detailedInfo">
				<h2>Types : {pokemon.types.map((type, index) => (
					<span key={index}>{type.type.name}{index < pokemon.types.length - 1 ? ', ' : ''}</span>
				))}</h2>
				<h2>Height: {pokemon.height}</h2>
				<h2>Weight: {pokemon.weight}</h2>
				<h2>Base experience: {pokemon.base_experience}</h2>
				<h2>Order: {pokemon.order}</h2>
				<h2>Is default: {pokemon.is_default ? "Yes" : "No"}</h2>
				<h2>Is legendary: {pokemon.is_legendary ? "Yes" : "No"}</h2>
				<h2>Is mythical: {pokemon.is_mythical ? "Yes" : "No"}</h2>
			</section>
		</div>
	);
};