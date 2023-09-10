import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { answersAtom, countAtom, sessionAtom } from "~/atoms/gameAtoms";
import { type Word } from "~/types/global";
import Heading from "~/components/Heading";
import Button from "~/components/Button";
import SuccessIcon from "/public/icons/check-circle.svg";
import ErrorIcon from "/public/icons/x-circle.svg";

type Props = {
  words: Word[];
};

export default function Score({ words }: Props) {
  const answers = useAtomValue(answersAtom);

  return (
    <>
      <Heading priority={1}>Score</Heading>
      <ul className="mb-3">
        {words?.map((word, i) => (
          <li key={word.jap} className="flex gap-x-1">
            <b>{word.jap}:</b>
            {word.eng.join(", ")}
            {answers[i]?.answer ? (
              <SuccessIcon width="24" className="stroke-green-600" />
            ) : (
              <ErrorIcon width="24" className="stroke-red-600" />
            )}
          </li>
        ))}
      </ul>
      <Footer words={words} />
    </>
  );
}

const Footer = ({ words }: Props) => {
  const setCount = useSetAtom(countAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const [answers, setAnswers] = useAtom(answersAtom);

  const handelRetry = () => {
    setCount(null);
    setAnswers([]);
  };
  const handleNextSession = () => {
    setSession(2);
    setCount(Math.floor(Math.random() * words.length));
  };

  const score = answers.reduce(
    (accumulator, currentValue) =>
      currentValue.answer ? accumulator + 1 : accumulator,
    0,
  );

  if (score < answers.length - 1) {
    return <Button onClick={handelRetry}>Retry</Button>;
  }
  if (session === 1) {
    return <Button onClick={handleNextSession}>Wait for second session</Button>;
  }
  return <p>You did good, you are set for today</p>;
};
