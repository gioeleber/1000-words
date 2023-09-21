import { type FormEvent, useState, useRef } from "react";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { getCsrfToken, signIn } from "next-auth/react";
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
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(ReqStatus.LOADING);

    void signIn("email", {
      email: emailRef.current?.value,
      callbackUrl: "/day-list",
    });
  };

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Sign In`}</title>
        <meta name="description" content="Sign In Page" />
      </Head>
      <Heading priority={1}>Sign in</Heading>
      <form className="w-80" method="post" onSubmit={handleSubmit}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Input
          ref={emailRef}
          className="mb-4"
          label="Email address"
          type="email"
          id="email"
          name="email"
          placeholder="Es. example@email.com"
          status={router.query?.error ? "error" : undefined}
          error="You must enter a registered email or a valid email"
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
