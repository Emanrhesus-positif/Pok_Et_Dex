import React, { useState, useEffect } from "react";
import { onCreatePokemon } from "./Page.telefunc.js";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import type { Pokemon } from "@prisma/client";
import { searchPokemon } from "../pokemon/index/+data";
import PokemonList from "./PokemonList.jsx";

export default function Page() {
  const data = useData<Data>();
  const [pokemonName, setPokemonName] = useState("");
  const [searchResults, setSearchResults] = useState<{ count: number; pokemon: Pokemon[] }>({ count: 0, pokemon: [] });
  const [pokemons, setPokemons] = useState<Pokemon[]>(data.pokemons || []);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPokemons(data.pokemons || []);
  }, [data.pokemons]);

  const handleSearchPokemon = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const results = await searchPokemon(pokemonName);
      console.log("results", results);
      setSearchResults(results);
    } catch (err) {
      setError("Pokemon non trouvé");
    }
  };

  const handleAddPokemon = async (pokemon: Pokemon) => {
    if (pokemons.length >= 6) {
      setError("Vous ne pouvez pas ajouter plus de 6 Pokémon à l'équipe.");
      return;
    }

    try {
      console.log("pokemon", pokemon);
      const addedPokemon = await onCreatePokemon(pokemon.name, pokemon.url);
      setPokemons((prevPokemons) => [...prevPokemons, addedPokemon]);
    } catch (err) {
      setError("Failed to add Pokemon to the team");
    }
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="font-bold text-3xl pb-6 text-center text-gray-800">
          Équipe Pokémons
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="font-bold text-2xl text-gray-700">Liste des Pokémons</h2>
          <form onSubmit={handleSearchPokemon} className="flex gap-2 items-center">
            <input
              type="text"
              value={pokemonName}
              onChange={(event) => setPokemonName(event.target.value)}
              placeholder="Rechercher un Pokémon"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Rechercher
            </button>
          </form>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <h2 className="font-bold text-2xl text-gray-700 mb-4">
              Résultats de la recherche
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.pokemon.length > 0 ? (
                searchResults.pokemon.map((pokemon) => (
                  <li
                    key={pokemon.id}
                    className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200"
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                      alt={pokemon.name}
                      className="w-24 h-24 mb-2"
                    />
                    <span className="font-semibold text-gray-800 mb-2">
                      {pokemon.name}
                    </span>
                    <button
                      onClick={() => handleAddPokemon(pokemon)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Ajouter à l'équipe
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-600">Aucun résultat</p>
              )}
            </ul>
          </div>

          <div className="w-full">
            <h2 className="font-bold text-2xl text-gray-700 mb-4">Équipe</h2>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <PokemonList pokemons={pokemons} onUpdatePokemons={setPokemons} />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};