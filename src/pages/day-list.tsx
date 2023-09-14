import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { dayAtom } from "~/atoms/gameAtoms";
import Heading from "~/components/Heading";
import NextLink from "~/components/NextLink";
import DAYS from "~/data/days.json";

export default function DayList() {
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
    // setDay(passedDays);
    setDay(4);
  }, []);
  return (
    <>
      <Heading priority={1}>You are at level {day}</Heading>
      <ul>
        {DAYS.map(({ day: dataDay }) =>
          dataDay <= day ? (
            <li key={dataDay}>
              <NextLink href={"/app/" + dataDay}>Day {dataDay}</NextLink>
            </li>
          ) : (
            <li key={dataDay}>Day {dataDay}</li>
          ),
        )}
      </ul>
    </>
  );
}
