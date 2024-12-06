// import { onNewPokemon } from "./Team.telefunc";
// import React, { useState } from "react";

// export function Team({ initialTodoItems }: { initialPokemons: { url: string }[] }) {
//   const [pokemons, setPokemons] = useState(initialPokemons);
//   const [newPokemon, setNewPokemon] = useState("");
//   return (
//     <>
//       <ul>
//         {pokemons.map((pokemon, index) => (
//           // biome-ignore lint:
//           <li key={index}>{pokemon.text}</li>
//         ))}
//       </ul>
//       <div>
//         <form
//           onSubmit={async (ev) => {
//             ev.preventDefault();

//             // Optimistic UI update
//             setPokemons((prev) => [...prev, { text: newPokemon }]);
//             try {
//               await onNewPokemon({ text: newPokemon });
//               setNewPokemon("");
//             } catch (e) {
//               console.error(e);
//               // rollback
//               setPokemons((prev) => prev.slice(0, -1));
//             }
//           }}
//         >
//           <input
//             type="text"
//             onChange={(ev) => setNewPokemon(ev.target.value)}
//             value={newPokemon}
//             className={
//               "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto p-2 mr-1 mb-1"
//             }
//           />
//           <button
//             type="submit"
//             className={
//               "text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto p-2"
//             }
//           >
//             Add pokemon
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }
