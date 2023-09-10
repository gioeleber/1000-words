import { type FormEvent, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { answersAtom, countAtom, dayAtom } from "~/atoms/gameAtoms";
import { type Word } from "~/types/global";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Heading from "~/components/Heading";
import { randomElement } from "~/utils/arrayUtils";

type Props = {
  words: Word[];
};

export default function Quiz({ words }: Props) {
  const responseRef = useRef<HTMLInputElement>(null);

  const [questionKeys, setQuestionKeys] = useState(
    words.map((word) => word.key),
  );
  const [count, setCount] = useAtom(countAtom);
  const setAnswers = useSetAtom(answersAtom);
  const day = useAtomValue(dayAtom);

  const handleCheck = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newQuestionKeys = questionKeys.filter((key) => {
      return key !== count! + (day - 1) * words.length;
    });

    setQuestionKeys(newQuestionKeys);
    const newQuestion = randomElement(newQuestionKeys);

    setAnswers((prev) => {
      const answer =
        words?.[count!]?.eng.some(
          (word) => word === responseRef.current?.value,
        ) ?? false;

      const aswers = prev.concat({
        key: words?.[count!]?.key ?? 0,
        answer,
      });
      return aswers.sort((a, b) => a.key - b.key);
    });

    setCount(newQuestion - (day - 1) * words.length);
    setTimeout(() => responseRef.current?.focus(), 50);
  };

  return (
    <>
      <Heading priority={1}>{words?.[count!]?.jap}</Heading>
      <form onSubmit={handleCheck} className="flex gap-x-3">
        <Input
          key={count}
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
