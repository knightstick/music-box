import Head from "next/head";
import { PropsWithChildren } from "react";

export interface Props {
  title?: string
}

export const Layout = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <>
      <Head>
        <title>{`${title} | ` || ''} Music Box</title>
      </Head>
      <header>
        <h1>Music Box</h1>
      </header>
      <main>{children}</main>
    </>
  )
}
