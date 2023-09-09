import { type FormEvent, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";

import { answersAtom, countAtom } from "~/atoms/gameAtoms";
import { ButtonStyle } from "~/types/components";
import { type Word } from "~/types/global";
import Button from "~/components/Button";
import Input from "~/components/Input";
import BackIcon from "/public/icons/chevron-left.svg";
import Heading from "~/components/Heading";

type Props = {
  today: Word[];
};

export default function Quiz({ today }: Props) {
  const responseRef = useRef<HTMLInputElement>(null);

  const [count, setCount] = useAtom(countAtom);
  const setAnswers = useSetAtom(answersAtom);

  const handleCheck = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnswers((prev) => {
      const answer =
        today?.[count!]?.eng.some(
          (word) => word === responseRef.current?.value,
        ) ?? false;

      return prev.concat(answer);
    });
    setCount((prev) => {
      return prev! + 1;
    });
    setTimeout(() => responseRef.current?.focus(), 50);
  };

  return (
    <>
      <Heading priority={1}>{today?.[count!]?.jap}</Heading>
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
