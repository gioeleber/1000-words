import { type Game, GameFase } from "~/types/global";

export const LEVEL_KEY = "level_day";
export const GAME_KEY = "game_info";

export const gameInitValue: Game = {
  session: 1,
  fase: GameFase.PREPARATION,
  words: [],
  answers: [],
};
