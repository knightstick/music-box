import { getTrack, Track } from "@/lib/spotify"
import { GetServerSideProps, NextPage } from "next"
import { getToken } from "next-auth/jwt"
import Image from "next/image"

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

  return { props: { track } }
}

export interface Props {
  track?: Track
}

const TrackPage: NextPage<Props> = ({ track }) => {
  if (!track) {
    return <div>Track not found</div>
  }

  return (
    <>
      <h2>
        {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
      </h2>
      <Image alt={track.album.name} src={track.album.images[0].url} width={track.album.images[0].width} height={track.album.images[0].height} />
      <p>{track.external_urls.spotify}</p>
    </>
  )
}

export default TrackPage

