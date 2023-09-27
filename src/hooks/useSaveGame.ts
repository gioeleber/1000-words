import { useSession } from "next-auth/react";
import useSaveGameLS from "./useSaveGameLS";
import { type Game } from "~/types/global";

export default function useSaveGame(day: number) {
  const { data: session } = useSession();
  const { gameLS, setGameLS } = useSaveGameLS(day);

  // if (session?.user) {
  return {
    game: gameLS,
    setGame: setGameLS,
  };
  // }
}
