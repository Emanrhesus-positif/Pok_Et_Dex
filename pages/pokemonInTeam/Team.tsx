import { onNewPokemon } from "./Team.telefunc";
import React, { useState } from "react";

export function Team({ initialPokemonItems }: { initialPokemonItems: { name: string }[] }) {
  const [pokemonItems, setPokemonItems] = useState(initialPokemonItems);
  const [newPokemon, setNewPokemon] = useState("");
  return (
    <>
      <ul>
        {pokemonItems.map((pokemonItem, index) => (
          // biome-ignore lint:
          <li key={index}>{pokemonItem.name}</li>
        ))}
      </ul>
      <div>
        <form
          onSubmit={async (ev) => {
            ev.preventDefault();

            // Optimistic UI update
            setPokemonItems((prev) => [...prev, { name: newPokemon }]);
            try {
              await onNewPokemon({ name: newPokemon });
              setNewPokemon("");
            } catch (e) {
              console.error(e);
              // rollback
              setPokemonItems((prev) => prev.slice(0, -1));
            }
          }}
        >
          <input
            type="text"
            onChange={(ev) => setNewPokemon(ev.target.value)}
            value={newPokemon}
            className={
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto p-2 mr-1 mb-1"
            }
          />
          <button
            type="submit"
            className={
              "text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto p-2"
            }
          >
            Add pokemon
          </button>
        </form>
      </div>
    </>
  );
}
