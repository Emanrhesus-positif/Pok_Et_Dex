// We use Telefunc (https://telefunc.com) for data mutations. Being able to use Telefunc for fetching initial data is work-in-progress (https://vike.dev/data-fetching#tools).

import { pokemons } from "../../database/pokemonItems";

export async function onNewPokemon({ name }: { name: string }) {
  pokemons.push({ name });
}
