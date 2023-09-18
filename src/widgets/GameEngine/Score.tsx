import { useEffect } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import Countdown from "react-countdown";

import { GameFase, type Game, type Word } from "~/types/global";
import Heading from "~/components/Heading";
import Button from "~/components/Button";
import SuccessIcon from "/public/icons/check-circle.svg";
import ErrorIcon from "/public/icons/x-circle.svg";
import { GAME_KEY, LEVEL_KEY, gameInitValue } from "~/utils/consts";
import { formatDate } from "~/utils/dateUtils";
import NextLink from "~/components/NextLink";

type Props = {
  words: Word[];
  day: number;
};

const isCountingAtom = atom<boolean>(false);

export default function Score({ words, day }: Props) {
  const isCounting = useAtomValue(isCountingAtom);
  const [level, setLevel] = useLocalStorage<{
    lastCompletion?: string | null;
    day: number;
  }>(LEVEL_KEY, { lastCompletion: undefined, day: 1 });
  const game = useReadLocalStorage<Game>(GAME_KEY);

  useEffect(() => {
    if (game?.session === 2) {
      setLevel({
        lastCompletion:
          level.day === day ? formatDate(new Date()) : level.lastCompletion,
        day: level.day,
      });
    }
  }, []);

  return (
    <>
      {!isCounting && (
        <>
          <Heading priority={1}>Score</Heading>
          <ul className="mb-3">
            {words?.map((word, i) => (
              <li key={word.jap} className="flex gap-x-1">
                <b>{word.jap}:</b>
                {word.eng.join(", ")}
                {game?.answers[i]?.answer ? (
                  <SuccessIcon width="24" className="stroke-green-600" />
                ) : (
                  <ErrorIcon width="24" className="stroke-red-600" />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      <Footer day={day} />
    </>
  );
}

const Footer = ({ day }: { day: number }) => {
  const [game, setGame] = useLocalStorage<Game>(GAME_KEY, {
    ...gameInitValue,
    day,
  });
  const [isCounting, setIsCounting] = useAtom(isCountingAtom);

  const handelRetry = () => {
    setGame(gameInitValue);
  };
  const handleNextSession = () => {
    setIsCounting(false);
    setGame({
      words: [],
      answers: [],
      session: 2,
      fase: GameFase.QUIZ,
    });
  };

  const score = game.answers.reduce(
    (accumulator, currentValue) =>
      currentValue.answer ? accumulator + 1 : accumulator,
    0,
  );

  if (isCounting) {
    return (
      <Countdown
        onComplete={handleNextSession}
        date={Date.now() + 3 * 1000} // 30
        renderer={({ seconds }) => <b className="text-2xl">{seconds}</b>}
      />
    );
  }

  if (score < game.answers.length - 1) {
    return <Button onClick={handelRetry}>Retry</Button>;
  }

  if (game.session === 1) {
    return (
      <Button onClick={() => setIsCounting(true)}>
        Wait for second session
      </Button>
    );
  }

  return (
    <>
      <p>You did good, you are set for today</p>
      <NextLink href="/day-list">Back to day selection</NextLink>
    </>
  );
};
