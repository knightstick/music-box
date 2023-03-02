import { getToken } from "next-auth/jwt"
import { useSession } from "next-auth/react"

import dynamic from 'next/dynamic';

const SpotifyPlayer = dynamic(
  () => import('react-spotify-web-playback')
    .then(module => module), { ssr: false }
);


export const SongPlayer = ({ url }: { url: string | undefined }) => {
  const { data: session, status } = useSession()
  if (!session) {
    return null
  }

  const { accessToken } = session

  if (!url) {
    return <div>Scan a QR code to play a song</div>
  }

  return (
    <>
      <SpotifyPlayer
        token={accessToken}
        uris={[url]}
        // TODO: refresh access token
        getOAuthToken={async (cb) => { console.log("getOAuthToken", cb) }}
      />
    </>
  )
}
