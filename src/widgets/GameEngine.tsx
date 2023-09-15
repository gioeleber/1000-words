import { useLocalStorage } from "usehooks-ts";

import DAYS from "~/data/days.json";
import Preparation from "./Preparation";
import Quiz from "./Quiz";
import Score from "./Score";
import { GAME_KEY, gameInitValue } from "~/utils/consts";
import { type Game } from "~/types/global";

type Props = {
  day: string;
};

export default function GameEngine({ day }: Props) {
  const [game] = useLocalStorage<Game>(GAME_KEY, gameInitValue);

  const today = DAYS.find(({ day: appDay }) => appDay === +day);

  if (!today) return <p>loading...</p>;
  if (game.count === null && game.session === 1) {
    return <Preparation words={today.words} />;
  }
  if ((game.count ?? 0) < (today?.words.length ?? 0)) {
    return <Quiz words={today.words} />;
  }
  return <Score words={today.words} />;
}
