import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export const Stats = () => {
  const { pokemon } = useData<Data>();

  return (
    <section className="statsSection p-6 bg-gray-50 rounded-lg shadow-md border">
      <h1 className="text-2xl font-bold mb-4">Stats</h1>
      <ul>
        {pokemon.stats.map((stat, index) => (
          <li key={index} className="flex justify-between capitalize mb-2">
            <span>{stat.stat.name}</span>
            <span>{stat.base_stat}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
