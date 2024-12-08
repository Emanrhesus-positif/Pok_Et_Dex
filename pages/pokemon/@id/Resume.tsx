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
	}, [activeSprite]);

	return (
		<div
			key=""
			className="p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200"
		>
			<section className="titleImage text-center mb-6">
				<h1 className="pokemonName text-3xl font-bold text-gray-800 mb-4">
					{pokemon.name}
				</h1>
				<div className="flex justify-center gap-4 mb-4">
					<img
						className="frontSprite w-24 h-24"
						src={frontSprite}
						alt={`${pokemon.name} front sprite`}
					/>
					<img
						className="backSprite w-24 h-24"
						src={backSprite}
						alt={`${pokemon.name} back sprite`}
					/>
				</div>
				<div className="flex flex-wrap justify-center gap-2">
					<button
						onClick={() => setActiveSprite("default")}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
					>
						Default
					</button>
					<button
						onClick={() => setActiveSprite("shiny")}
						className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
					>
						Shiny
					</button>
					{pokemon.sprites.front_female && (
						<button
							onClick={() => setActiveSprite("female")}
							className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
						>
							Femelle
						</button>
					)}
					{pokemon.sprites.front_shiny_female && (
						<button
							onClick={() => setActiveSprite("shiny_female")}
							className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
						>
							Shiny Female
						</button>
					)}
				</div>
			</section>
			<section className="detailedInfo bg-white rounded-lg p-4 shadow-inner border">
				<h2 className="text-lg font-semibold text-gray-700 mb-2">
					Types:{" "}
					<span className="text-gray-600">
						{pokemon.types.map((type, index) => (
							<span key={index}>
								{type.type.name}
								{index < pokemon.types.length - 1 ? ", " : ""}
							</span>
						))}
					</span>
				</h2>
				<h2 className="text-lg font-semibold text-gray-700 mb-2">
					Height: <span className="text-gray-600">{pokemon.height}</span>
				</h2>
				<h2 className="text-lg font-semibold text-gray-700 mb-2">
					Weight: <span className="text-gray-600">{pokemon.weight}</span>
				</h2>
				<h2 className="text-lg font-semibold text-gray-700 mb-2">
					Base Experience:{" "}
					<span className="text-gray-600">{pokemon.base_experience}</span>
				</h2>
				<h2 className="text-lg font-semibold text-gray-700 mb-2">
					Order: <span className="text-gray-600">{pokemon.order}</span>
				</h2>
				<h2 className="text-lg font-semibold text-gray-700 mb-2">
					Is Default:{" "}
					<span className="text-gray-600">
						{pokemon.is_default ? "Yes" : "No"}
					</span>
				</h2>
				<h2 className="text-lg font-semibold text-gray-700 mb-2">
					Is Legendary:{" "}
					<span className="text-gray-600">
						{pokemon.is_legendary ? "Yes" : "No"}
					</span>
				</h2>
				<h2 className="text-lg font-semibold text-gray-700 mb-2">
					Is Mythical:{" "}
					<span className="text-gray-600">
						{pokemon.is_mythical ? "Yes" : "No"}
					</span>
				</h2>
			</section>
		</div>

	);
};