import { useEffect } from "react";

import day1 from "~/mock/day1.json";
import day2 from "~/mock/day2.json";
import { expiresDate, getCookie, setCookie } from "~/utils/cookieUtils";
import Preparation from "./Preparation";

import { countAtom, dayAtom } from "~/atoms/gameAtoms";
import { useAtom, useAtomValue } from "jotai";
import Quiz from "./Quiz";
import Score from "./Score";

const DAYS = [day1, day2];

export default function Home() {
  const count = useAtomValue(countAtom);
  const [day, setDay] = useAtom(dayAtom);

  const today = DAYS[day];

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
    return <Preparation today={today} />;
  }
  if (count < (today?.length ?? 0)) {
    return <Quiz today={today} />;
  }
  return <Score today={today} />;
}
