import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import Heading from "~/components/Heading";
import NextLink from "~/components/NextLink";
import { ButtonStyle } from "~/types/components";
import { APP_NAME } from "~/utils/consts";
import Auth from "~/widgets/Auth";

export default function Header() {
  const router = useRouter();

  const isHome = router.pathname === "/";
  console.log(router.pathname);

  return (
    <header className="fixed left-0 top-0 w-full border-b border-gray-100 bg-white">
      <nav
        className={clsx(
          "flex items-center p-2",
          isHome ? "justify-end" : "justify-between",
        )}
      >
        {router.pathname !== "/" && (
          <NextLink href="/" linkStyle={ButtonStyle.NULL}>
            <Heading priority={1} className="mb-0 sm:text-3xl">
              {APP_NAME}
            </Heading>
          </NextLink>
        )}
        <Auth />
      </nav>
    </header>
  );
}
