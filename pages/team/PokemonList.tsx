import { useState } from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import type { Pokemon } from "@prisma/client";
import { memo } from "react";
import { onUpdate, onDelete } from "./Page.telefunc.js";


const PokemonList = memo(() => {
    const data = useData<Data>();

    const [pokemons, setPokemons] = useState<Pokemon[]>(data.pokemons);
    const handleSuppression = async (id: number) => {
        await onDelete(id);
        setPokemons(pokemons.filter((pokemon) => pokemon.id !== id));
    };

  return (
    <div>
      <h1>Pokemons</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
              <a>{pokemon.name}</a>
              <button onClick={() => handleSuppression(pokemon.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

PokemonList.displayName = "PokemonList";

export default PokemonList;