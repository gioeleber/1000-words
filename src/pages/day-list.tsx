import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";

import Heading from "~/components/Heading";
import { gameInitValue } from "~/utils/consts";
import { formatDate } from "~/utils/dateUtils";
import DAYS from "~/data/days.json";
import { GameFase } from "~/types/global";
import Button from "~/components/Button";
import { useRouter } from "next/router";
import { ButtonStyle } from "~/types/components";
import clsx from "clsx";
import useSaveGame from "~/hooks/useSaveGame";

export default function DayList() {
  const router = useRouter();
  const { game, setGame } = useSaveGame(1);

  const [isClient, setIsClient] = useState(false);
  const [day, setDay] = useState(1);
  const [week, setWeek] = useState(0);

  const [showCompleatedAdvice, toggleCompleatedAdvice] =
    useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const now = formatDate(new Date());
    if (game.lastCompletion === undefined) {
      setGame({ lastCompletion: null, level: 1 });
      return;
    }
    if (game.lastCompletion !== null && now > game.lastCompletion) {
      setGame({ lastCompletion: null, level: game.level + 1 });
      setDay((game?.day ?? 0) + 1);
      return;
    }
    setDay(game.level);
    toggleCompleatedAdvice(!!game.lastCompletion);
  }, []);

  const handleGoToDay = (dataDay: number) => {
    if (game.day !== dataDay) {
      setGame({ ...gameInitValue, day: dataDay, fase: GameFase.PREPARATION });
    }
    void router.push("/app/" + dataDay);
  };

  const days = useMemo(() => {
    return DAYS.slice(week * 7, week * 7 + 7);
  }, [week]);

  if (!isClient) return null;

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
      <Heading priority={3}>Week {week + 1}</Heading>
      <ul>
        {days.map(({ day: dataDay }) =>
          dataDay <= day ? (
            <li key={dataDay}>
              <Button
                buttonStyle={ButtonStyle.LINK}
                onClick={() => handleGoToDay(dataDay)}
              >
                Day {dataDay}
              </Button>
            </li>
          ) : (
            <li key={dataDay}>Day {dataDay}</li>
          ),
        )}
      </ul>
      <ul className="flex gap-x-2">
        {Array(Math.ceil(DAYS.length / 7))
          .fill(null)
          .map((_, i) => (
            <li key={i.toString()}>
              <button
                onClick={() => setWeek(i)}
                className={clsx(
                  "h-2 w-2 rounded-full",
                  week === i ? "bg-neutral-600" : "bg-neutral-300",
                )}
                aria-label={"page " + i.toString()}
              ></button>
            </li>
          ))}
      </ul>
    </>
  );
}
