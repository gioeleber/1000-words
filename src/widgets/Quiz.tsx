import { type FormEvent, useRef, useState } from "react";
import { useAtomValue } from "jotai";

import { dayAtom } from "~/atoms/gameAtoms";
import { type Game, type Word } from "~/types/global";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Heading from "~/components/Heading";
import { randomElement } from "~/utils/arrayUtils";
import { GAME_KEY, gameInitValue } from "~/utils/consts";
import { useLocalStorage } from "usehooks-ts";

type Props = {
  words: Word[];
};

export default function Quiz({ words }: Props) {
  const responseRef = useRef<HTMLInputElement>(null);

  const [questionKeys, setQuestionKeys] = useState(
    words.map((word) => word.key),
  );
  const [game, setGame] = useLocalStorage<Game>(GAME_KEY, gameInitValue);
  const day = useAtomValue(dayAtom);

  const handleCheck = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newQuestionKeys = questionKeys.filter((key) => {
      return key !== game.count! + (day - 1) * words.length;
    });

    setQuestionKeys(newQuestionKeys);
    const newQuestion = randomElement(newQuestionKeys);

    const answer =
      words?.[game.count!]?.eng.some(
        (word) => word === responseRef.current?.value,
      ) ?? false;

    const aswers = game.answers.concat({
      key: words?.[game.count!]?.key ?? 0,
      answer,
    });

    setGame({
      ...game,
      answers: aswers.sort((a, b) => a.key - b.key),
      count: newQuestion - (day - 1) * words.length,
    });

    setTimeout(() => responseRef.current?.focus(), 50);
  };

  return (
    <>
      <Heading priority={1}>{words?.[game.count!]?.jap}</Heading>
      <form onSubmit={handleCheck} className="flex gap-x-3">
        <Input
          key={game.count}
          ref={responseRef}
          type="text"
          label="Answer"
          hideLabel
          placeholder="Your answer"
        />
        <Button>Confirm response</Button>
      </form>
    </>
  );
}
