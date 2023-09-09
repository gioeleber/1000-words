import Heading from "~/components/Heading";
import NextLink from "~/components/NextLink";
import { ButtonStyle } from "~/types/components";

export default function index() {
  return (
    <>
      <Heading priority={1}>1000 words</Heading>
      <Heading priority={2} className="text-zinc-500">
        Learn the 1000 most used words in Japanise
      </Heading>
      <NextLink href="/app" linkStyle={ButtonStyle.PRIMARY}>
        Start daily session
      </NextLink>
    </>
  );
}
