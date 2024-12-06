import type { Data } from "./+data";
import React from "react";
import { useData } from "vike-react/useData";
// import { Team } from "./Team.jsx";

export default function Page() {
  const data = useData<Data>();
  return (
    <>
      <h1>Pokemon Team</h1>
      {/* <Team initialTodoItems={data.pokemon} /> */}
    </>
  );
}
