import { useAtom, useSetAtom } from "jotai";

import { answersAtom, countAtom } from "~/atoms/gameAtoms";
import { type Word } from "~/types/global";
import Heading from "~/components/Heading";
import Button from "~/components/Button";
import SuccessIcon from "/public/icons/check-circle.svg";
import ErrorIcon from "/public/icons/x-circle.svg";

type Props = {
  today: Word[];
};

export default function Score({ today }: Props) {
  const setCount = useSetAtom(countAtom);
  const [answers, setAnswers] = useAtom(answersAtom);

  const score = answers.reduce(
    (accumulator, currentValue) =>
      currentValue ? accumulator + 1 : accumulator,
    0,
  );

  const handelRetry = () => {
    setCount(null);
    setAnswers([]);
  };

  return (
    <>
      <Heading priority={1}>Score</Heading>
      <ul className="mb-3">
        {today?.map((word, i) => (
          <li key={word.jap} className="flex">
            <b>{word.jap}:</b> {word.eng.join(", ")}
            {answers[i] ? (
              <SuccessIcon width="24" className="stroke-green-600" />
            ) : (
              <ErrorIcon width="24" className="stroke-red-600" />
            )}
          </li>
        ))}
      </ul>
      {score < 9 ? (
        <Button onClick={handelRetry}>Retry</Button>
      ) : (
        <p>You did good, you are set for today</p>
      )}
    </>
  );
}
