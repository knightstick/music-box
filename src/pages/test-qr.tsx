import { GetServerSideProps, NextPage } from "next";
import QRCode from "react-qr-code";

export interface Props {
  testQrUrl: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const testQrUrl = process.env.TEST_QR_URL

  if (!testQrUrl) {
    return { notFound: true }
  }

  return { props: { testQrUrl } }
}


const TestQrPage: NextPage<Props> = ({ testQrUrl }) => {
  if (!testQrUrl) {
    throw new Error("testQrUrl is undefined")
  }

  return (
    <div>
      <h1>Test QR</h1>
      <QRCode value={testQrUrl} />
    </div>
  )
}

export default TestQrPage

