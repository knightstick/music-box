import { signIn, useSession } from "next-auth/react"

export const AuthMenu = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <>Loading...</>
  }

  if (status === "unauthenticated") {
    return (
      <a href="#" onClick={() => signIn()}>Sign in</a>
    )
  }

  if (status === "authenticated") {
    return (
      <>
        <p>Logged in as {session.user.name}</p>

      </>
    )
  }

  return null
}
