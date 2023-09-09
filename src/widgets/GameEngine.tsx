import { useEffect } from "react";

import DAYS from "~/data/days.json";
import { expiresDate, getCookie, setCookie } from "~/utils/cookieUtils";
import Preparation from "./Preparation";

import { countAtom, dayAtom } from "~/atoms/gameAtoms";
import { useAtom, useAtomValue } from "jotai";
import Quiz from "./Quiz";
import Score from "./Score";

export default function Home() {
  const count = useAtomValue(countAtom);
  const [day, setDay] = useAtom(dayAtom);

  const today = DAYS.find(({ day: appDay }) => appDay === day + 1);

  useEffect(() => {
    const startDate = getCookie("start_date");
    const now = Date.now();
    if (!startDate) {
      setCookie({
        key: "stat_date",
        value: now.toString(),
        expires: expiresDate("year"),
      });
      return;
    }
    const passedDays = Math.floor((+now - +startDate) / 1000 / 60 / 60 / 24);
    setDay(passedDays);
  }, []);

  if (!today) {
    return <p>loading...</p>;
  }

  if (count === null) {
    return <Preparation today={today.words} />;
  }
  if (count < (today?.words.length ?? 0)) {
    return <Quiz today={today.words} />;
  }
  return <Score today={today.words} />;
}
