import Head from "next/head";
import GameEngine from "~/widgets/GameEngine";

export default function app() {
  return (
    <>
      <Head>
        <title>1000 words</title>
        <meta name="description" content="Jap learning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameEngine />
    </>
  );
}
