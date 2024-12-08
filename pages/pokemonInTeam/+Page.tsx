import type { Data } from "./+data";
import React from "react";
import { useData } from "vike-react/useData";
import { Team } from "./Team";

export default function Page() {
  const data = useData<Data>();
  return (
    <>
      <h1>Equipe</h1>
      <Team initialPokemonItems={data.pokemon} />
    </>
  );
}
