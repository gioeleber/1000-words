import { type FormEvent, useRef, useState, useEffect } from "react";

import { GameFase, type Game, type Word } from "~/types/global";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Heading from "~/components/Heading";
import { GAME_KEY, gameInitValue } from "~/utils/consts";
import { useLocalStorage } from "usehooks-ts";
import { shuffle } from "~/utils/arrayUtils";

type Props = {
  words: Word[];
};

export default function Quiz({ words }: Props) {
  const responseRef = useRef<HTMLInputElement>(null);

  const [game, setGame] = useLocalStorage<Game>(GAME_KEY, gameInitValue);
  const [quizWords, setQuizWords] = useState<Word[] | null>(null);

  useEffect(() => {
    setQuizWords(game.words.length === 0 ? shuffle(words) : game.words);
  }, []);

  useEffect(() => {
    if (quizWords) {
      setGame({
        ...game,
        fase: quizWords.length === 0 ? GameFase.SCORE : GameFase.QUIZ,
      });
    }
  }, [quizWords]);

  const handleCheck = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const answer =
      quizWords?.[0]?.eng.some((word) => word === responseRef.current?.value) ??
      false;

    const aswers = game.answers.concat({
      key: quizWords?.[0]?.key ?? 0,
      answer,
    });

    const remainingWords = quizWords?.filter((_, i) => i !== 0) ?? [];

    setGame({
      ...game,
      words: remainingWords,
      answers: aswers.sort((a, b) => a.key - b.key),
    });
    setQuizWords(remainingWords);

    setTimeout(() => responseRef.current?.focus(), 50);
  };

  return (
    <>
      <Heading priority={1}>{quizWords?.[0]?.jap}</Heading>
      <form onSubmit={handleCheck} className="flex gap-x-3">
        <Input
          key={quizWords?.[0]?.key}
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
