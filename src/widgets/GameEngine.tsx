import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useLocalStorage } from "usehooks-ts";

import { countAtom, dayAtom, sessionAtom } from "~/atoms/gameAtoms";
import DAYS from "~/data/days.json";
import Preparation from "./Preparation";
import Quiz from "./Quiz";
import Score from "./Score";

type Props = {
  day: string;
};

export default function GameEngine({ day }: Props) {
  const count = useAtomValue(countAtom);
  const session = useAtomValue(sessionAtom);

  const today = DAYS.find(({ day: appDay }) => appDay === +day);

  if (!today) return <p>loading...</p>;
  if (count === null && session === 1) {
    return <Preparation words={today.words} />;
  }
  if ((count ?? 0) < (today?.words.length ?? 0)) {
    return <Quiz words={today.words} />;
  }
  return <Score words={today.words} />;
}
