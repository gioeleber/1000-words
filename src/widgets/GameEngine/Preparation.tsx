import { useLocalStorage } from "usehooks-ts";

import Button from "~/components/Button";
import Heading from "~/components/Heading";
import { GameFase, type Game, type Word } from "~/types/global";
import { GAME_KEY, gameInitValue } from "~/utils/consts";

type Props = {
  words: Word[];
  day: number;
};

export default function Preparation({ words, day }: Props) {
  const [game, setGame] = useLocalStorage<Game>(GAME_KEY, {
    ...gameInitValue,
    day,
  });

  const handelStart = () => {
    setGame({ ...game, fase: GameFase.QUIZ });
  };

  if (game.day !== day) {
    setGame({ ...gameInitValue, day });
    return;
  }

  return (
    <>
      <Heading priority={1}>Words for the day</Heading>
      <ul className="mb-3">
        {words.map((word) => (
          <li key={word.jap}>
            <b>{word.jap}:</b> {word.eng.join(", ")}
          </li>
        ))}
      </ul>
      <Button onClick={handelStart}>Start game</Button>
    </>
  );
}
