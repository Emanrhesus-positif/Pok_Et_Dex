// We use Telefunc (https://telefunc.com) for data mutations. Being able to use Telefunc for fetching initial data is work-in-progress (https://vike.dev/data-fetching#tools).

import { pokemons } from "../../database/pokemons";

export async function onNewPokemon({ url }: { url: string }) {
  pokemons.push({ url });
}
