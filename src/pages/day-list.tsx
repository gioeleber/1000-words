import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import Heading from "~/components/Heading";
import NextLink from "~/components/NextLink";
import { LEVEL_KEY } from "~/utils/consts";
import { formatDate } from "~/utils/dateUtils";
import DAYS from "~/data/days.json";
import { type Level } from "~/types/global";

export default function DayList() {
  const [day, setDay] = useState<number>(1);
  const [level, setLevel] = useLocalStorage<Level>(LEVEL_KEY, {
    lastCompletion: undefined,
    day: 1,
  });
  const [showCompleatedAdvice, toggleCompleatedAdvice] =
    useState<boolean>(false);

  useEffect(() => {
    toggleCompleatedAdvice(!!level.lastCompletion);
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
      {showCompleatedAdvice && (
        <p>You are set for today. Come back tomorrow to unlock a new level!</p>
      )}
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
