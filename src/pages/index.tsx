import Head from "next/head";
import { type FormEvent, useRef, useState } from "react";
import day from "~/mock/day1.json";

export default function Home() {
  const responseRef = useRef<HTMLInputElement>(null);

  const [count, setCount] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  console.log(answers);

  const handelStart = () => {
    setCount(0);
  };
  const handleCheck = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnswers((prev) => {
      const answer =
        day[count!]?.eng.some((word) => word === responseRef.current?.value) ??
        false;

      return prev.concat(answer);
    });
    setCount((prev) => {
      return prev! + 1;
    });
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
            <h2>Words for the day</h2>
            <ul>
              {day.map((word) => (
                <li key={word.jap}>
                  {word.jap}: {word.eng.join(", ")}
                </li>
              ))}
            </ul>
            <button onClick={handelStart}>Start game</button>
          </>
        ) : count < day.length ? (
          <>
            <p>{day[count]?.jap}</p>
            <form onSubmit={handleCheck}>
              <input
                key={count}
                ref={responseRef}
                className="border"
                type="text"
              />
              <button>Check response</button>
            </form>
          </>
        ) : (
          <>
            <h2>score</h2>
            <ul>
              {day.map((word, i) => (
                <li key={word.jap}>
                  {word.jap}: {word.eng.join(", ")} (
                  {answers[i] ? "right" : "wrong"})
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </>
  );
}
