import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export const Abilities = () => {
  const { pokemon } = useData<Data>();

  return (
    <section className="abilitiesSection p-6 bg-gray-50 rounded-lg shadow-md border">
      <h1 className="text-2xl font-bold mb-4">Abilities</h1>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index} className="capitalize">
            {ability.ability.name} {ability.is_hidden && <span>(Hidden)</span>}
          </li>
        ))}
      </ul>
    </section>
  );
};
