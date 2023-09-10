import { useSetAtom } from "jotai";

import { countAtom } from "~/atoms/gameAtoms";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import { type Word } from "~/types/global";

type Props = {
  words: Word[];
};

export default function Preparation({ words }: Props) {
  const setCount = useSetAtom(countAtom);

  const handelStart = () => {
    setCount(Math.floor(Math.random() * words.length));
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
