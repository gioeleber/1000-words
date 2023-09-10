import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useLocalStorage } from "usehooks-ts";

import { countAtom, dayAtom, sessionAtom } from "~/atoms/gameAtoms";
import DAYS from "~/data/days.json";
import Preparation from "./Preparation";
import Quiz from "./Quiz";
import Score from "./Score";

export default function Home() {
  const count = useAtomValue(countAtom);
  const session = useAtomValue(sessionAtom);
  const [day, setDay] = useAtom(dayAtom);
  const [startDate, setStartDate] = useLocalStorage<null | number>(
    "start_date",
    null,
  );

  useEffect(() => {
    const now = Date.now();
    if (startDate === null) {
      setStartDate(now);
      return;
    }
    const passedDays = Math.ceil((+now - +startDate) / 1000 / 60 / 60 / 24);
    setDay(passedDays);
  }, []);

  const today = DAYS.find(({ day: appDay }) => appDay === day);

  if (!today) {
    return <p>loading...</p>;
  }

  if (count === null && session === 1) {
    return <Preparation words={today.words} />;
  }
  console.log(count ?? 0 < (today?.words.length ?? 0));
  if ((count ?? 0) < (today?.words.length ?? 0)) {
    return <Quiz words={today.words} />;
  }
  return <Score words={today.words} />;
}
