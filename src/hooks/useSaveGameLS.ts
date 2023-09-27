import { useLocalStorage } from "usehooks-ts";
import { type Game } from "~/types/global";
import { GAME_KEY, gameInitValue } from "~/utils/consts";

export default function useSaveGameLS(day: number) {
  const [game, setGame] = useLocalStorage<Game>(GAME_KEY, {
    ...gameInitValue,
    day,
  });

  return {
    gameLS: game,
    setGameLS: (newValues: Partial<Game>) => setGame({ ...game, ...newValues }),
  };
}
