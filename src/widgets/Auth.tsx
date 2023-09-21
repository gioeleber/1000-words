import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Button from "../components/Button";
import NextLink from "../components/NextLink";
import { ReqStatus } from "../types/global";
import { ButtonStyle } from "../types/components";
import UserIcon from "/public/icons/user-circle.svg";
import LogoutIcon from "/public/icons/arrow-right-on-rectangle.svg";

export default function AuthButton(): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession();

  return session?.user ? (
    <NextLink
      href="/user"
      linkStyle={ButtonStyle.NULL}
      aria-label="user-profile"
      className="flex flex-col items-center text-zinc-700"
    >
      <UserIcon width={32} />
      <span className="text-xs leading-3">user</span>
    </NextLink>
  ) : (
    <Button
      onClick={() => {
        void router.push("/api/auth/signin");
      }}
    >
      Sign in
    </Button>
  );
}

interface SignOutProps {
  confirm?: boolean;
  className?: string;
}

export const SignOutButton = ({ confirm, className }: SignOutProps) => {
  const router = useRouter();

  const [status, setStatus] = useState(ReqStatus.IDLE);

  const handleSignOut = () => {
    setStatus(ReqStatus.LOADING);
    confirm
      ? void signOut({ callbackUrl: "/" })
      : void router.push("/api/auth/signout");
  };

  return (
    <Button
      buttonStyle={ButtonStyle.ERROR}
      onClick={handleSignOut}
      isLoading={status === ReqStatus.LOADING}
      className={className}
    >
      <LogoutIcon width="18" className="me-2" />
      Sign out
    </Button>
  );
};
