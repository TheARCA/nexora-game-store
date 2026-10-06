import { extraGames } from "./extraGames.js";

export const catalogVersion = 2;

// Apply the expansion once. Existing edits and later deletions stay intact.
export function upgradeCatalog(games, savedVersion) {
  if (savedVersion >= catalogVersion) return games;
  const existingIds = new Set(games.map((game) => game.id));
  return [...games, ...extraGames.filter((game) => !existingIds.has(game.id))];
}
