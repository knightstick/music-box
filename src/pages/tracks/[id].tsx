import { getTrack, Track } from "@/lib/spotify"
import { GetServerSideProps, NextPage } from "next"
import { getToken } from "next-auth/jwt"
import Image from "next/image"
import QRCode from "react-qr-code"

// TODO: static generation
export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken({ req: context.req })
  if (!token) {
    return { redirect: { destination: '/', permanent: false } }
  }

  const accessToken = token.accessToken
  const { id } = context.query
  const track = await getTrack(id as string, accessToken as string)

  if (!track) {
    return { notFound: true, }
  }

  const ngrokUrl = process.env.NGROK_URL!

  return { props: { track, ngrokUrl } }
}

export interface Props {
  track?: Track
  ngrokUrl: string
}


const TrackPage: NextPage<Props> = ({ track, ngrokUrl }) => {
  if (!track || track === null || track === undefined || track.artists === undefined) {
    return <div>Track not found</div>
  }

  return (
    <>
      <h2>
        {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
      </h2>
      <Image alt={track.album.name} src={track.album.images[0].url} width={track.album.images[0].width} height={track.album.images[0].height} />
      <p>{track.uri}</p>
      <QRCode value={track.uri} /><br />

      <QRCode value={`${ngrokUrl}/kids-app`} style={{ marginTop: "3em" }} />
    </>
  )
}

export default TrackPage

