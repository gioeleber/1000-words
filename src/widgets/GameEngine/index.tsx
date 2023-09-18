import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

import DAYS from "~/data/days.json";
import Preparation from "./Preparation";
import Quiz from "./Quiz";
import Score from "./Score";
import { GAME_KEY, LEVEL_KEY, gameInitValue } from "~/utils/consts";
import { GameFase, type Game, type Level } from "~/types/global";
import Heading from "~/components/Heading";
import NextLink from "~/components/NextLink";

type Props = {
  day: number;
};

export default function GameEngine({ day }: Props) {
  const [game] = useLocalStorage<Game>(GAME_KEY, {
    ...gameInitValue,
    day,
  });
  const level = useReadLocalStorage<Level>(LEVEL_KEY);

  const today = DAYS.find(({ day: appDay }) => appDay === day);

  if (day > (level?.day ?? 1)) {
    return (
      <>
        <Heading priority={1}>You are not at this level yet</Heading>
        <NextLink href="/day-list">Back to day list</NextLink>
      </>
    );
  }
  if (!today) return <p>loading...</p>;

  switch (true) {
    case game.fase === GameFase.PREPARATION:
      return <Preparation words={today.words} day={day} />;
    case game.fase === GameFase.QUIZ:
      return <Quiz words={today.words} day={day} />;
    default:
      return <Score words={today.words} day={day} />;
  }
}
