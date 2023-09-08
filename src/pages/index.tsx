import Head from "next/head";
import { type FormEvent, useRef, useState, useEffect } from "react";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Input from "~/components/Input";
import day1 from "~/mock/day1.json";
import day2 from "~/mock/day2.json";
import { getCookie, setCookie } from "~/utils/cookieUtils";

import SuccessIcon from "/public/icons/check-circle.svg";
import ErrorIcon from "/public/icons/x-circle.svg";

const DAYS = [day1, day2];

export default function Home() {
  const responseRef = useRef<HTMLInputElement>(null);

  const [count, setCount] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [day, setDay] = useState<number>(0);
  const today = DAYS[day];

  useEffect(() => {
    const startDate = getCookie("start_date");
    const now = new Date();
    if (!startDate) {
      setCookie({ key: "stat_date", value: now.toString() });
      return;
    }
    console.log((+now - +startDate) / 1000 / 60 / 60 / 24);
    const passedDays = Math.floor((+now - +startDate) / 1000 / 60 / 60 / 24);
    setDay(passedDays);
  }, []);

  const handelStart = () => {
    setCount(0);
  };
  const handleCheck = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnswers((prev) => {
      const answer =
        today?.[count!]?.eng.some(
          (word) => word === responseRef.current?.value,
        ) ?? false;

      return prev.concat(answer);
    });
    setCount((prev) => {
      return prev! + 1;
    });
  };

  const handelRetry = () => {
    setCount(null);
    setAnswers([]);
  };

  return (
    <>
      <Head>
        <title>1000 words</title>
        <meta name="description" content="Jap learning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center">
        {count === null ? (
          <>
            <Heading priority={2}>Words for the day</Heading>
            <ul className="mb-3">
              {today?.map((word) => (
                <li key={word.jap}>
                  {word.jap}: {word.eng.join(", ")}
                </li>
              ))}
            </ul>
            <Button onClick={handelStart}>Start game</Button>
          </>
        ) : count < (today?.length ?? 0) ? (
          <>
            <p className="mb-3">{today?.[count]?.jap}</p>
            <form onSubmit={handleCheck} className="flex gap-x-3">
              <Input
                key={count}
                ref={responseRef}
                type="text"
                label="Answer"
                hideLabel
                placeholder="Your answer"
              />
              <Button>Confirm response</Button>
            </form>
          </>
        ) : (
          <>
            <Heading priority={2}>Score</Heading>
            <ul className="mb-3">
              {today?.map((word, i) => (
                <li key={word.jap} className="flex">
                  <b>{word.jap}:</b> {word.eng.join(", ")}
                  {answers[i] ? (
                    <SuccessIcon width="24" className="stroke-green-600" />
                  ) : (
                    <ErrorIcon width="24" className="stroke-red-600" />
                  )}
                </li>
              ))}
            </ul>
            {answers.reduce(
              (accumulator, currentValue) =>
                currentValue ? accumulator + 1 : accumulator,
              0,
            ) < 9 ? (
              <Button onClick={handelRetry}>Retry</Button>
            ) : (
              <p>You did good, you are set for today</p>
            )}
          </>
        )}
      </main>
    </>
  );
}
