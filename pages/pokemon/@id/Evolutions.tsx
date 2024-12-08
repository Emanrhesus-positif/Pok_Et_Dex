import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export const Evolutions = () => {
  const { evolutionChain } = useData<Data>();

  const getEvolutions = (chain) => {
    const evolutions = [];
    let current = chain;

    while (current) {
      evolutions.push({
        name: current.species.name,
        url: current.species.url,
      });
      current = current.evolves_to[0];
    }

    return evolutions;
  };

  const evolutions = getEvolutions(evolutionChain.chain);

  return (
    <section className="evolutionsSection p-6 bg-gray-50 rounded-lg shadow-md border">
      <h1 className="text-2xl font-bold mb-4">Evolutions</h1>
      <ul className="flex gap-4">
        {evolutions.map((evolution, index) => (
          <li key={index} className="text-center">
            <a href={`/pokemon/${evolution.url.split("/").slice(-2, -1)}`}>
              <p className="capitalize">{evolution.name}</p>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.url
                  .split("/")
                  .slice(-2, -1)}.png`}
                alt={evolution.name}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
