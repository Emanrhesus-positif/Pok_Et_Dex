interface Pokemon {
  url: string;
}

const pokemonsDefault = [{ url: "empty" }];

const database =
  // We create an in-memory database.
  // - We use globalThis so that the database isn't reset upon HMR.
  // - The database is reset when restarting the server, use a proper database (SQLite/PostgreSQL/...) if you want persistent data.
  // biome-ignore lint:
  ((globalThis as unknown as { __database: { pokemons: Pokemon[] } }).__database ??= { pokemons: pokemonsDefault });

const { pokemons } = database;

export { pokemons };
export type { Pokemon };
