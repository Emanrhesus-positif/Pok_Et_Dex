import React, { useState, useEffect } from "react";
import { onCreatePokemon } from "./Page.telefunc.js";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import type { Pokemon } from "@prisma/client";
import { searchPokemon } from "../pokemon/index/+data";
import PokemonList from "./PokemonList.jsx";

export default function Page () {
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
      setError("Pokemon not found");
    }
  };

  const handleAddPokemon = async (pokemon: Pokemon) => {
    const addedPokemon = await onCreatePokemon(pokemon.name, pokemon.url);
    setPokemons([...pokemons, addedPokemon]);
  };

  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>Equipe Pokemons</h1>
      <div className="flex flex-row">
        <h2 className={"font-bold text-2xl"}>Liste des Pokemons</h2>
        <form onSubmit={handleSearchPokemon}>
          <input
            type="text"
            value={pokemonName}
            onChange={(event) => setPokemonName(event.target.value)}
          />
          <button type="submit">Rechercher</button>
        </form>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="flex flex-row">
        <h2 className={"font-bold text-2xl"}>Résultats de la recherche</h2>
        <ul>
          {searchResults.pokemon.length > 0 ? (
            searchResults.pokemon.map((pokemon) => (
              <li key={pokemon.id}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
                <span>{pokemon.name}</span>
                <button onClick={() => handleAddPokemon(pokemon)}>Ajouter à l'équipe</button>
              </li>
            ))
          ) : (
            <p>Aucun résultat</p>
          )}
        </ul>
      </div>
      <div className="List">
        <h2 className={"font-bold text-2xl"}>Equipe</h2>
        {<PokemonList initialPokemons={pokemons} />}
      </div>
    </>
  );
};