import { useSetAtom } from "jotai";

import { countAtom } from "~/atoms/gameAtoms";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import { type Word } from "~/types/global";

type Props = {
  today: Word[];
};

export default function Preparation({ today }: Props) {
  const setCount = useSetAtom(countAtom);

  const handelStart = () => {
    setCount(0);
  };

  return (
    <>
      <Heading priority={1}>Words for the day</Heading>
      <ul className="mb-3">
        {today.map((word) => (
          <li key={word.jap}>
            <b>{word.jap}:</b> {word.eng.join(", ")}
          </li>
        ))}
      </ul>
      <Button onClick={handelStart}>Start game</Button>
    </>
  );
}
