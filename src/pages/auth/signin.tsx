import { useState } from "react";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { getCsrfToken } from "next-auth/react";
import Head from "next/head";

import Button from "~/components/Button";
import Input from "~/components/Input";
import Heading from "~/components/Heading";
import { ReqStatus } from "~/types/global";
import { APP_NAME } from "~/utils/consts";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [status, setStatus] = useState(ReqStatus.IDLE);

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Sign In`}</title>
        <meta name="description" content="Sign In Page" />
      </Head>
      <Heading priority={1}>Sign in</Heading>
      <form
        className="w-80"
        method="post"
        action="/api/auth/signin/email"
        onSubmit={() => setStatus(ReqStatus.LOADING)}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Input
          className="mb-4"
          label="Email address"
          type="email"
          id="email"
          name="email"
          placeholder="Es. example@email.com"
          status={router.query?.error ? "error" : undefined}
          error={"You must enter a registered email or a valid email"}
        />
        <Button
          type="submit"
          isLoading={status === ReqStatus.LOADING}
          className="w-full"
        >
          Sign in with Email
        </Button>
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  csrfToken: string | undefined;
}> = async (context) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
};
