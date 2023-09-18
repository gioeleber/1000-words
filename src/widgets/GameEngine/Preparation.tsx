import { useLocalStorage } from "usehooks-ts";

import Button from "~/components/Button";
import Heading from "~/components/Heading";
import { GameFase, type Game, type Word } from "~/types/global";
import { shuffle } from "~/utils/arrayUtils";
import { GAME_KEY, gameInitValue } from "~/utils/consts";

type Props = {
  words: Word[];
};

export default function Preparation({ words }: Props) {
  const [game, setGame] = useLocalStorage<Game>(GAME_KEY, gameInitValue);

  const handelStart = () => {
    setGame({ ...game, fase: GameFase.QUIZ });
  };

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
