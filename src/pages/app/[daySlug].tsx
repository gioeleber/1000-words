import Head from "next/head";
import { useRouter } from "next/router";
import GameEngine from "~/widgets/GameEngine";

export default function App() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>1000 words | App</title>
        <meta name="description" content="Jap learning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameEngine day={Number(router.query.daySlug as string)} />
    </>
  );
}
