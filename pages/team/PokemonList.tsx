import { memo } from "react";
import type { Pokemon } from "@prisma/client";
import { onDelete } from "./Page.telefunc.js";

interface PokemonListProps {
  pokemons: Pokemon[];
  onUpdatePokemons: (updatedPokemons: Pokemon[]) => void;
}

const PokemonList = memo(({ pokemons, onUpdatePokemons }: PokemonListProps) => {
  const handleSuppression = async (id: number) => {
    await onDelete(id);
    const updatedPokemons = pokemons.filter((pokemon) => pokemon.id !== id);
    onUpdatePokemons(updatedPokemons); // Informer le parent
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4"
          >
            <a
              href={`/pokemon/${pokemon.imageUrl.split("/")[6]}`}
              className="text-lg font-bold text-blue-600 hover:underline mb-2"
            >
              {pokemon.name}
            </a>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.imageUrl.split("/")[6]}.png`}
              alt={pokemon.name}
              className="w-24 h-24 mb-4"
            />
            {/* <p className="text-sm text-gray-500">
          Types:{" "}
          {pokemon.types.map((type) => (
            <span key={type} className="mr-1">{type.name}</span>
          ))}
        </p> */}
            <button
              onClick={() => handleSuppression(pokemon.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>

  );
});

PokemonList.displayName = "PokemonList";

export default PokemonList;
