import { useAtom } from "jotai";
import Head from "next/head";
import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { dayAtom } from "~/atoms/gameAtoms";
import Heading from "~/components/Heading";
import NextLink from "~/components/NextLink";
import DAYS from "~/data/days.json";
import { LEVEL_KEY } from "~/utils/consts";
import { formatDate } from "~/utils/dateUtils";

export default function DayList() {
  const [day, setDay] = useAtom(dayAtom);
  const [level, setLevel] = useLocalStorage<{
    lastCompletion?: string | null;
    day: number;
  }>(LEVEL_KEY, { lastCompletion: undefined, day: 1 });

  useEffect(() => {
    const now = formatDate(new Date());
    if (level.lastCompletion === undefined) {
      setLevel({ lastCompletion: null, day: 1 });
      return;
    }
    if (level.lastCompletion !== null && now > level.lastCompletion) {
      setLevel({ lastCompletion: null, day: level.day + 1 });
      setDay(level.day + 1);
      return;
    }
    setDay(level.day);
  }, []);

  return (
    <>
      <Head>
        <title>1000 words | Day list</title>
        <meta name="description" content="Jap learning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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