export type Pokemon = {
  id: string;
  name: string;
  url: string;
};

export type PokemonDetails = Pokemon & {
  count: number;
  id: number;
  abilities: { ability: { name: string } }[];
  base_experience: number;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  stats: { base_stat: number; effort: number; stat: { name: string } }[];
  sprites: { front_default: string };
  moves: { move: { name: string } }[];
};
