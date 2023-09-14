import Head from "next/head";
import Heading from "~/components/Heading";
import NextLink from "~/components/NextLink";
import { ButtonStyle } from "~/types/components";

export default function Index() {
  return (
    <>
      <Head>
        <title>1000 words | Day list</title>
        <meta name="description" content="Jap learning app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading priority={1}>1000 words</Heading>
      <Heading priority={2} className="text-zinc-500">
        Learn the 1000 most used words in Japanise
      </Heading>
      <NextLink href="/day-list" linkStyle={ButtonStyle.PRIMARY}>
        Start daily session
      </NextLink>
    </>
  );
}
