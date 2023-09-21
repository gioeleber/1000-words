import React, { type ReactElement, type ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

export default function Wrapper({ children }: Props): ReactElement {
  return (
    <>
      <Header />
      <main className=" flex min-h-screen flex-col items-center justify-center">
        {children}
      </main>
    </>
  );
}
